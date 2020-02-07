function sieve(n) {
    var a = new Int8Array(n + 1);
    var max = Math.floor(Math.sqrt(n));
    var p = 2;
    while (p <= max) {
        for (var i = 2 * p; i <= n; i += p) {
            a[i] = 1;
        }
        while (a[++p]) ;
    }
    while (a[n]) n--;
    return n;

}