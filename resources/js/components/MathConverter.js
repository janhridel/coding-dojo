import React, {Component} from 'react';
import ReactDOM from 'react-dom';

function Result(props) {
    return (
        <h3><span className="badge badge-secondary">{props.value}</span></h3>
    );
}


export default class MathConverter extends Component {

    constructor(props) {
        super(props);
        this.handleDecimalToRomanChange = this.handleDecimalToRomanChange.bind(this);
        this.handleRomanToDecimalChange = this.handleRomanToDecimalChange.bind(this);

        this.state = {
            decimalToRomanResult: '',
            romanToDecimalResult: '',
        };
    }

    fromRomanDigit(inputValue) {
        switch (inputValue) {
            case 'I':
                return 1;
            case 'V':
                return 5;
            case 'X':
                return 10;
            case 'L':
                return 50;
            case 'C':
                return 100;
            case 'D':
                return 500;
            case 'M':
                return 1000;
            default:
                return 0;
        }
    }

    toRomanDigit(inputValue) {
        switch (inputValue) {
            case 1:
                return 'I';
            case 5:
                return 'V';
            case 10:
                return 'X';
            case 50:
                return 'L';
            case 100:
                return 'C';
            case 500:
                return 'D';
            case 1000:
                return 'M';
            default:
                return '0';
        }
    }

    decimalToRoman(decimalNumber) {
        let decimalToRomanResult = '';
        let num = 0;
        let tens = true;

        for (let i = 1000; i >= 1; i = tens ? i / 2 : i / 5, tens = !tens) {
            num = decimalNumber / i;

            for (let j = 1; j <= num; j++) {
                decimalToRomanResult += this.toRomanDigit(i);
            }

            decimalNumber %= i;

            if (decimalNumber === 0) {
                return decimalToRomanResult;
            }

            for (let j = 1; j <= 100 && j < i; j *= 10) {
                if (i - decimalNumber <= j) {
                    decimalToRomanResult += this.toRomanDigit(j);
                    decimalToRomanResult += this.toRomanDigit(i);
                    decimalNumber %= j;
                }
            }
        }

        return decimalToRomanResult;
    }


    romanToDecimal(romanValue) {
        let num = 0;
        let digit;
        let nextDigit;
        let repetitions = 1;
        let prevDigit = 0;
        let nextNextDigit;

        for (let i = 0; i < romanValue.length; i++) {
            digit = this.fromRomanDigit(romanValue[i]);

            if (digit === 0) {
                return -1;
            }

            if (digit === prevDigit) {
                repetitions++;
            } else {
                repetitions = 1;
            }

            if ((digit === 1 || digit === 10 || digit === 100) && repetitions > 3) {
                return -1;
            }

            if ((digit === 5 || digit === 50 || digit === 500) && repetitions > 1) {
                return -1;
            }

            prevDigit = digit;
            if (i < romanValue.length - 1) {
                nextDigit = this.fromRomanDigit(romanValue[i + 1]);
                if (nextDigit > digit) {
                    if (digit !== 1 && digit !== 10 && digit !== 100) {
                        return -1;
                    }
                    if (repetitions > 1) {
                        return -1;
                    }
                    if (i < romanValue.length - 2) {
                        nextNextDigit = this.fromRomanDigit(romanValue[i + 2]);
                        if (nextDigit <= nextNextDigit) {
                            return -1;
                        }
                        if (nextNextDigit >= digit) {
                            return -1;
                        }
                    }
                    digit = nextDigit - digit;
                    i++;
                    repetitions = 1;
                    prevDigit = nextDigit;
                }
            }
            num += digit;
        }
        return num;
    }


    handleDecimalToRomanChange(event) {
        this.setState({
            decimalToRomanResult: this.decimalToRoman(event.target.value),
        });
    }

    handleRomanToDecimalChange(event) {
        this.setState({
            romanToDecimalResult: this.romanToDecimal(event.target.value),
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header"><i>Decimal</i> &rArr; <i>Roman</i></div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-5">
                                        <input className="form-control" type="number"
                                               onChange={this.handleDecimalToRomanChange}/>
                                    </div>
                                    <div className="col-md-2">&rArr;</div>
                                    <div className="col-md-5">
                                        <Result value={this.state.decimalToRomanResult}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header"><i>Roman</i> &rArr; <i>Decimal</i></div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-5">
                                        <input className="form-control" type="text"
                                               onChange={this.handleRomanToDecimalChange}/>
                                    </div>
                                    <div className="col-md-2">&rArr;</div>
                                    <div className="col-md-5">
                                        <Result value={this.state.romanToDecimalResult}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('math-converter')) {
    ReactDOM.render(<MathConverter/>, document.getElementById('math-converter'));
}
