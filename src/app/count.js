var app = angular.module("calculator", []);
        app.controller("FirstController", function ($scope) {
                $scope.textView = "0";
                $scope.fuhao = "";
                $scope.firstNumber = "";
                $scope.secondNumber = "";
                $scope.doEmpty = function () {
                    $scope.textView = "0";
                    $scope.fuhao = "";
                    $scope.firstNumber = "";
                    $scope.secondNumber = "";
                }
                //點擊正負數時
                $scope.valiteNumber = function () {
                    if ($scope.firstNumber == "") {//什麼都沒有時
                        $scope.firstNumber = "-";
                        return;
                    }
                    if ($scope.firstNumber != "" && $scope.fuhao == "") {
                        if ($scope.firstNumber / 1 > 0) {
                            $scope.firstNumber = "-" + $scope.firstNumber;
                        } else {
                            $scope.firstNumber = $scope.firstNumber.substring(1, $scope.firstNumber.length);
                        }
                        $scope.textView = $scope.firstNumber;
                        return;
                    }
                    if ($scope.fuhao != "") {
                        if ($scope.secondNumber == "") {
                            $scope.secondNumber = "-";
                            $scope.textView = $scope.secondNumber;
                            return;
                        }
                        if ($scope.secondNumber / 1 > 0) {
                            $scope.secondNumber = "-" + $scope.secondNumber;
                        } else {
                            $scope.secondNumber = $scope.secondNumber.substring(1, $scope.secondNumber.length);
                        }
                        $scope.textView = $scope.secondNumber;
                        return;
                    }

                }

                //點擊運算符號
                $scope.addChar = function (theChar) {
                    if ($scope.firstNumber != "" && $scope.fuhao == "") {
                        if ($scope.firstNumber == "." || $scope.firstNumber == "-") {
                            return;
                        }
                        $scope.fuhao = theChar;
                        return;
                    }
                    if ($scope.firstNumber != "" && $scope.fuhao != "" && $scope.secondNumber == "") {
                        $scope.fuhao = theChar;
                        return;
                    }
                    if ($scope.firstNumber != "" && $scope.fuhao != "" && $scope.secondNumber != "") {
                        if ($scope.secondNumber == "." || $scope.secondNumber == "-") {
                            return;
                        }
                        if ($scope.fuhao == "÷" && $scope.secondNumber == "0") {
                            return;
                        }
                        $scope.doCount();
                        $scope.fuhao = theChar;
                        return;
                    }
                    // $scope.textView = $scope.firstNumber + $scope.fuhao + $scope.secondNumber;

                }    //addChar

                //刪除
                $scope.deleteOneChar = function () {
                    if ($scope.secondNumber != "") {
                        $scope.secondNumber = $scope.secondNumber.substring(0, $scope.secondNumber.length - 1);
                        $scope.textView = $scope.secondNumber;
                        return;
                    }
                    if ($scope.fuhao != "") {
                        $scope.fuhao = "";
                        $scope.textView = $scope.firstNumber;
                        return;
                    }
                    if ($scope.firstNumber != "") {
                        $scope.firstNumber = $scope.firstNumber.substring(0, $scope.firstNumber.length - 1);
                        if ($scope.firstNumber == "") {
                            $scope.textView = "0";
                            return;
                        }
                        $scope.textView = $scope.firstNumber;
                        return;
                    }
                    $scope.textView = 0;
                }//deleteOneChar

                //添加數字
                $scope.addNumber = function (text) {
                    if ($scope.fuhao == "") {
                        if (text == "." && $scope.firstNumber.indexOf(".") > -1) {
                            return;
                        }
                        $scope.firstNumber += text;
                        $scope.textView = $scope.firstNumber;
                    } else {
                        if (text == "." && $scope.secondNumber.indexOf(".") > -1) {
                            return;
                        }
                        $scope.secondNumber += text;
                        $scope.textView = $scope.secondNumber;
                    }
                }

                //計算
                $scope.doCount = function () {
                    if ($scope.firstNumber == "" || $scope.fuhao == "" || $scope.secondNumber == "") {
                        return;
                    }
                    if ($scope.firstNumber != "") {
                        if ($scope.firstNumber == "." || $scope.firstNumber == "-") {
                            return;
                        }
                    }
                    if ($scope.secondNumber != "") {
                        if ($scope.secondNumber == "." || $scope.secondNumber == "-") {
                            return;
                        }
                    }
                    var fNumber = $scope.firstNumber / 1;
                    var sNumber = $scope.secondNumber / 1;
                    var result = 0;
                    switch ($scope.fuhao) {
                        case "×":
                            result = fNumber * sNumber;
                            break;
                        case "÷":
                            if (sNumber == 0) {
                                return;
                            }
                            result = fNumber / sNumber;
                            break;
                        case "+":
                            result = fNumber + sNumber;
                            break;
                        case "-":
                            result = fNumber - sNumber;
                            break;
                    }
                    if ($scope.fuhao == "÷" && sNumber == 1) {

                    } else {
                        var temp = result + "";
                        if (temp.indexOf('.') > -1 && temp.split('.')[1].length >= 8) {
                            result = result.toFixed(8);
                        }
                    }
                    $scope.textView = result / 1 + "";
                    $scope.fuhao = "";
                    $scope.firstNumber = result / 1 + "";
                    $scope.secondNumber = "";
                    return result
                }//doCount
            }
        );