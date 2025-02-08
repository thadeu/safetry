const acorn = require('acorn');
const tsPlugin = require('acorn-typescript').default
const { generate } = require('astring');

class SafetryTransformer {
  constructor() {
    this.Parser = class extends acorn.Parser.extend(tsPlugin()) {
      parseMaybeUnary(...args) {
        if (this.value == 'safetry') {
          const node = this.startNode();
          
          this.next();
          
          node.block = this.parseBlock();
          
          return this.finishNode(node, 'SafetryExpression');
        }
        return super.parseMaybeUnary(...args);
      }
    };

    this.Parser.acorn = acorn;
    this.Parser.keywords = new RegExp(acorn.Parser.keywords + '|safetry');
  }

  transform(code) {
    try {
      const ast = this.Parser.parse(code, {
        ecmaVersion: 'latest',
        sourceType: 'module',
        allowAwaitOutsideFunction: true,
        allowReturnOutsideFunction: true,
      });
      
      this.transformNode(ast);

      return { code: generate(ast), error: null };
    } catch (error) {
      return { code: null, error };
    }
  }

  transformNode(node, isAsync = false) {
    if (!node) return;

    
    if (node.type === 'SafetryExpression') {
      return this.transformSafetryExpression(node, isAsync);
    }

    for (const key in node) {
      if (node[key] && typeof node[key] === 'object') {
        if (Array.isArray(node[key])) {
          node[key].forEach((child, index) => {
            if (child && typeof child === 'object') {
              node[key][index] = this.transformNode(child);
            }
          });
        } else {
          if (node.type == 'AwaitExpression' && node.argument.type == 'SafetryExpression') {
            node[key] = this.transformNode(node[key], true);
          } else {
            node[key] = this.transformNode(node[key], isAsync);
          }
        }
      }
    }

    return node;
  }

  transformSafetryExpression(node, isAsync = false) {
    const tryBlock = node.block.body;
    const errorVar = { type: "Identifier", name: "$$__error__" };
    const valueVar = { type: "Identifier", name: "$$__value__" };

    const variableDeclarations = {
      type: "VariableDeclaration",
      kind: "let",
      declarations: [
        {
          type: "VariableDeclarator",
          id: errorVar,
          init: { type: "Literal", value: null },
        },
        {
          type: "VariableDeclarator",
          id: valueVar,
          init: { type: "Literal", value: null },
        },
      ],
    };

    const catchHandler = {
      type: "CatchClause",
      param: { type: "Identifier", name: "err" },
      body: {
        type: "BlockStatement",
        body: [
          {
            type: "ExpressionStatement",
            expression: {
              type: "AssignmentExpression",
              operator: "=",
              left: errorVar,
              right: { type: "Identifier", name: "err" },
            },
          },
        ],
      },
    };

    if (tryBlock.length == 1) {
      const lastStatement = tryBlock[tryBlock.length - 1];
      
      if (!['Statement', 'ReturnStatement'].includes(lastStatement.type)) {
        const returnStatement = {
          type: 'ReturnStatement',
          argument: lastStatement
        }
  
        if (lastStatement.type == 'ExpressionStatement') {
          returnStatement.argument = lastStatement.expression;
          tryBlock[tryBlock.length - 1] = returnStatement
        }
      }
    }

    const arrowFnStatement = {
      type: 'ArrowFunctionExpression',
      async: isAsync,
      params: [],
      body: {
        type: 'BlockStatement',
        body: tryBlock
      }
    }

    let rightInvokeBlockStatement = {
      type: "CallExpression",
      callee: arrowFnStatement,
      arguments: []
    }

    if (isAsync) {
      rightInvokeBlockStatement = {
        type: "AwaitExpression",
        argument: rightInvokeBlockStatement
      }
    }

    const invokeBlockStatement = {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: valueVar,
        right: rightInvokeBlockStatement
      },
    }

    const safetryStatement = {
      type: 'CallExpression',
      arguments: [],
      callee: {
        type: 'ArrowFunctionExpression',
        async: isAsync,
        params: [],
        body: {
          type: 'BlockStatement',
          body: [
            variableDeclarations,
            {
              type: 'TryStatement',
              block: {
                type: 'BlockStatement',
                body: [
                  invokeBlockStatement
                ]
              },
              handler: catchHandler,
            },
            {
              type: 'ReturnStatement',
              argument: {
                type: 'ArrayExpression',
                elements: [
                  errorVar,
                  valueVar
                ]
              }
            }
          ]
        }
      },
    };

    return safetryStatement
  }
}

module.exports = { SafetryTransformer };