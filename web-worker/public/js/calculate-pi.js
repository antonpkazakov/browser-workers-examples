/* ****************
 * All credit for this code goes to https://trans4mind.com/personal_development/JavaScript/longnumPiMachin.htm
 ****************** */

      var Base = Math.pow(10, 11);
      var cellSize = Math.floor(Math.log(Base) / Math.LN10);
      var a = Number.MAX_VALUE;
      var MaxDiv = Math.floor(Math.sqrt(a));
      var aAngle;
      var aDivK;
      function makeArray(n, aX, Integer) {
        var i = 0;
        for (i = 1; i < n; i++) aX[i] = null;
        aX[0] = Integer
      }
      function isEmpty(aX) {
        var empty = true
        for (i = 0; i < aX.length; i++) if (aX[i]) {
          empty = false;
          break
        }
        return empty
      }
      function Add(n, aX, aY) {
        var carry = 0
        for (i = n - 1; i >= 0; i--) {
          aX[i] += Number(aY[i]) + Number(carry);
          if (aX[i] < Base) carry = 0;
          else {
            carry = 1;
            aX[i] = Number(aX[i]) - Number(Base)
          }
        }
      }
      function Sub(n, aX, aY) {
        for (i = n - 1; i >= 0; i--) {
          aX[i] -= aY[i];
          if (aX[i] < 0) {
            if (i > 0) {
              aX[i] += Base;
              aX[i - 1]--
            }
          }
        }
      }
      function Mul(n, aX, iMult) {
        var carry = 0;
        var prod;
        for (i = n - 1; i >= 0; i--) {
          prod = (aX[i]) * iMult;
          prod += carry;
          if (prod >= Base) {
            carry = Math.floor(prod / Base);
            prod -= (carry * Base)
          } else carry = 0;
          aX[i] = prod
        }
      }
      function Div(n, aX, iDiv, aY) {
        var carry = 0;
        var currVal, theDiv;
        for (i = 0; i < n; i++) {
          currVal = Number(aX[i]) + Number(carry * Base);
          theDiv = Math.floor(currVal / iDiv);
          carry = currVal - theDiv * iDiv;
          aY[i] = theDiv
        }
      }
      function arctan(iAng, n, aX) {
        var iAng_squared = iAng * iAng;
        var k = 3;
        var sign = 0;
        makeArray(n, aX, 0);
        makeArray(n, aAngle, 1);
        Div(n, aAngle, iAng, aAngle);
        Add(n, aX, aAngle);
        while (!isEmpty(aAngle)) {
          Div(n, aAngle, iAng_squared, aAngle);
          Div(n, aAngle, k, aDivK);
          if (sign) Add(n, aX, aDivK);
          else Sub(n, aX, aDivK);
          k += 2;
          sign = 1 - sign
        }
      }
      function calculatePi(numDec) {
        var ans = "";
        var t1 = new Date();
        numDec = Number(numDec);
        var iAng = new Array(10);
        var coeff = new Array(10);
        var arrayLength = Math.ceil(1 + numDec / cellSize);
        var aPI = new Array(arrayLength);
        var aArctan = new Array(arrayLength);
        aDivK = new Array(arrayLength);
        aAngle = new Array(arrayLength);
        coeff[0] = 4;
        coeff[1] = -1;
        coeff[2] = 0;
        iAng[0] = 5;
        iAng[1] = 239;
        iAng[2] = 0;
        makeArray(arrayLength, aPI, 0);
        makeArray(arrayLength, aAngle, 0);
        makeArray(arrayLength, aDivK, 0);
        for (var i = 0; coeff[i] != 0; i++) {
          arctan(iAng[i], arrayLength, aArctan);
          Mul(arrayLength, aArctan, Math.abs(coeff[i]));
          if (coeff[i] > 0) Add(arrayLength, aPI, aArctan);
          else Sub(arrayLength, aPI, aArctan)
        }
        Mul(arrayLength, aPI, 4);
        var sPI = "";
        var tempPI = "";
        for (i = 0; i < aPI.length; i++) {
          aPI[i] = String(aPI[i]);
          if (aPI[i].length < cellSize && i != 0) {
            while (aPI[i].length < cellSize) aPI[i] = "0" + aPI[i]
          }
          tempPI += aPI[i]
        }
        var thespace = " ";
        for (i = 0; i <= numDec; i++) {
          if (i % 5 == 0) sPI += tempPI.charAt(i) + thespace;
          else sPI += tempPI.charAt(i)
        }

        return `Pi (${numDec}) = ${sPI}`;
      }
