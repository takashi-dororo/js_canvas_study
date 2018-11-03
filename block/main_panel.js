window.onload = function() {
  let canvas = document.getElementById('canvas_elm'),
    context = canvas.getContext('2d'),
    min = 1,
    max = 30,
    ball_radius = Math.floor( Math.random() * (max + 1 - min) ) + min, //ボールの半径
    x = canvas.width * Math.random(), // ballの位置を指定(x座標)
    y = canvas.height - 30, //ballの位置を指定(y座標)
    dx = 1,
    dy = -1,
    r = Math.random() * 256,
    g = Math.random() * 256,
    b = Math.random() * 256;
    color = "rgb(" + r + "," + g + "," + b + ")";
  function draw_ball() {
    context.beginPath();
    context.arc(x, y, ball_radius, 0, Math.PI*2);
    // context.fillStyle = '#009500';
    context.fillStyle = 'red';
    context.fill();
    context.closePath();
  }
  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); //指定された全てのピクセルを透明な黒に
    draw_ball();
    if (x + dx > canvas.width - ball_radius || x + dx < 0 + ball_radius) {
      dx = -dx;
    }
    if(y + dy > canvas.height - ball_radius || y + dy < 0 + ball_radius) {
      dy = -dy;
    }
    x += dx; //コメントアウトすると動かなくなる
    y += dy;
    requestAnimationFrame(draw);
  }
  document.getElementById('start').addEventListener('click', draw, false);
}
