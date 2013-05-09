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

    redPx = throwCtx.createImageData(1, 1);
    redPx.data[0] = 255; // R
    redPx.data[1] = 0; // G
    redPx.data[2] = 0; // B
    redPx.data[3] = 255; // A

    greenPx = throwCtx.createImageData(1, 1);
    greenPx.data[0] = 0; // R
    greenPx.data[1] = 255; // G
    greenPx.data[2] = 0; // B
    greenPx.data[3] = 255; // A

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
            var coloredPx = greenPx;
        } else {
            ++misses;
            missesEl.textContent = misses;
            var coloredPx = redPx;
        }
        ++total;

        // Recalculate pi
        piEl.textContent = 4 * hits / total;
        
        // Put pixel
        var imgX = (x + 1) / 2 * width;
        var imgY = (y + 1) / 2 * height;

        throwCtx.putImageData(coloredPx, imgX, imgY);
    };

    setTimeout(loop, 0);
};