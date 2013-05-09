montecarlopi = function () {
    (function () {
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        window.requestAnimationFrame = requestAnimationFrame;
    })();

    var hitsEl = document.getElementById('hits');
    var missesEl = document.getElementById('misses');
    var piEl = document.getElementById('pi');

    var canvas = document.getElementById('circle');
    ctx = canvas.getContext('2d');

    var width = canvas.width;
    var height = canvas.height;
    var radius = Math.min(width, height) / 2;

    var hits = 0;
    var misses = 0;
    var total = 0;

    // Draw circle
    ctx.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
    ctx.rect(0, 0, width, height);
    ctx.stroke();

    var throwCtx = document.getElementById('throws').getContext('2d');

    px = throwCtx.createImageData(1, 1);
    px.data[0] = 255; // R
    px.data[1] = 0; // G
    px.data[2] = 0; // B
    px.data[3] = 255; // A

    function loop() {
        for (var i = 0; i < 50; ++i) {
            throwOne();
        }
        setTimeout(loop, 0);
    }

    function throwOne() {
        // Throw a new one
        var x = Math.random() * 2 - 1;
        var y = Math.random() * 2 - 1;

        if (Math.pow(x, 2) + Math.pow(y, 2) <= 1) {
            ++hits;
            hitsEl.textContent = hits
        } else {
            ++misses;
            missesEl.textContent = misses;
        }
        ++total;

        // Recalculate pi
        piEl.textContent = 4 * hits / total;
        
        // Put pixel
        var imgX = (x + 1) / 2 * width;
        var imgY = (y + 1) / 2 * height;

        throwCtx.putImageData(px, imgX, imgY);
    };

    setTimeout(loop, 0);
};