document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let expression = '';
    let lastResult = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (button.id === 'clear') {
                expression = '';
                lastResult = null;
                display.innerText = '0';
                return;
            }

            if (button.id === 'delete') {
                if (lastResult !== null) {
                    // Clear the result and start new expression
                    expression = '';
                    lastResult = null;
                } else {
                    expression = expression.slice(0, -1);
                }
                display.innerText = expression || '0';
                return;
            }

            if (button.id === 'percent') {
                if (expression && !isOperator(expression.slice(-1))) {
                    expression += '%';
                }
                display.innerText = expression;
                return;
            }

            if (button.id === 'equals') {
                if (expression) {
                    try {
                        let finalExpression = expression.replace(/×/g, '*').replace(/÷/g, '/');
                        
                        // Evaluate percentage expressions correctly
                        finalExpression = finalExpression.replace(/(\d+(\.\d+)?)%(\d+(\.\d+)?)/g, function(match, p1, p2, p3) {
                            return (parseFloat(p1) / 100) * parseFloat(p3);
                        });

                        const result = eval(finalExpression);
                        display.innerText = result;
                        expression = result.toString();
                        lastResult = result;
                    } catch (e) {
                        display.innerText = 'Error';
                        expression = '';
                        lastResult = null;
                    }
                }
                return;
            }

            if (lastResult !== null && !button.classList.contains('operator') && button.id !== 'percent') {
                // If there is a last result and the button is a number, start new expression
                expression = '';
                lastResult = null;
            }

            if (button.classList.contains('operator')) {
                if (lastResult !== null) {
                    expression = lastResult.toString();
                    lastResult = null;
                }
                if (expression && !isOperator(expression.slice(-1))) {
                    expression += value;
                } else if (expression && isOperator(expression.slice(-1))) {
                    expression = expression.slice(0, -1) + value;
                } else if (!expression && value === '-') {
                    expression += value;
                }
            } else {
                expression += value;
            }

            display.innerText = expression;
        });
    });

    function isOperator(char) {
        return ['+', '-', '*', '/'].includes(char);
    }
});
