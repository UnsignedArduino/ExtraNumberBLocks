namespace Math {
    //% block="ln $num"
    //% group="Logs"
    export function ln(num: number): number {
        return Math.log(num);
    }

    //% block="log $num base $base"
    //% group="Logs"
    export function logBase(num: number, base: number): number {
        return Math.log(num) / Math.log(base)
    }

    //% block="log10 $num"
    //% group="Logs"
    export function log10(num: number): number {
        return Math.log(num) / Math.log(10)
    }

    //% block="toExponential $num precision $precision"
    //% group="Formatting"
    export function toExponential(num: number, precision: number | null = null): string {
        // https://gist.github.com/SheetJSDev/1100ad56b9f856c95299e
        // 2: Let f be ToInteger(fractionDigits).
        let f = precision | 0;
        let x = num;

        // 3: If x is NaN, return the String "NaN".
        if (isNaN(x)) return "NaN";

        // 4: Let s be the empty string
        let s = "";

        // 5: If x < 0
        if (x < 0) { s = "-"; x = -x; }

        // 6: If x = +Infinity
        if (x === Infinity) return s + "Infinity";

        // 7: If fractionDigits is not undefined and (f < 0 or f > 20), throw a RangeError exception.
        if (typeof precision != "undefined" && (f < 0 || f > 20)) throw ("Fraction Digits " + precision + " out of range");

        let m = "", e = 0, c = "", d = "";

        // 8: If x = 0 then
        if (x == 0) { f = e = 0; m = "0"; }

        // 9: Else, x != 0
        else {
            let L = Math.log10(x);
            e = Math.floor(L); // 10 ** e <= x and x < 10 ** (e+1)
            let n = 0;
            if (typeof precision != "undefined") {
                let w = Math.pow(10, e - f); // x / 10 ** (f+1) < w and w <= x / 10 ** f
                n = Math.round(x / w); // 10 ** f <= n and n < 10 ** (f+1)
                if (2 * x >= ((2 * n + 1) * w)) ++n; // pick larger value 
                if (n >= Math.pow(10, f + 1)) { n /= 10; ++e; } // 10e-1 = 1e0
            } else {
                f = 22; // start from 22 and loop down
                let guess_n = Math.round(Math.pow(10, L - e + f));
                let target_f = f;
                while (f-- > 0) {
                    guess_n = Math.round(Math.pow(10, L - e + f));
                    if (Math.abs(guess_n * Math.pow(10, e - f) - x) <= Math.abs(n * Math.pow(10, e - target_f) - x)) { target_f = f; n = guess_n; }
                }
            }
            m = n.toString();
            if (typeof precision == "undefined") while (m.slice(-1) == "0") { m = m.slice(0, -1); d = (parseInt(d) + 1).toString(); }
        }

        // 10: If f != 0, then
        if (f != 0) m = m.slice(0, 1) + "." + m.slice(1);

        // 11: If e = 0, then
        if (e == 0) { c = "+"; d = "0"; }

        // 12: Else
        else {
            c = e > 0 ? "+" : "-";
            d = Math.abs(e).toString();
        }

        // 13: Let m be the concatenation of the four Strings m, "e", c, and d.
        m += "e" + c + d;

        // 14: Return the concatenation of the Strings s and m.
        return s + m;
    }
}
