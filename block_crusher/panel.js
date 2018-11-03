window.onload = function() {
  let canvas = document.getElementById('canvas_elm'),
      context = canvas.getContext('2d'),
      ball_radius = 10,
      x = canvas.width * Math.random(),
      y = canvas.height - 30,
      dx = 1,
      dy = -1;
      r = Math.random() * 256,
      g = Math.random() * 256,
      b = Math.random() * 256;
      color = "rgb(" + r + "," + g + "," + b + ")";
  // blockの設定値
  const block_padding = 10,
        block_offset_top = 30,
        block_offset_left = 30,
        block_column_count = 5,
        block_row_count = 4,
        margin = ((block_offset_left * 2) + (block_padding * (block_column_count - 1))),
        block_width = (canvas.width - margin) / block_column_count,
        block_height = 50;
  // blockオブジェクト カラムx軸に５　ロウy軸に４個？
  let blocks = [];
  for(let c = 0; c < block_column_count; c++) {
    blocks[c] = [];
    for(let r = 0; r < block_row_count; r++) {
      blocks[c][r] = { x: 0, y: 0, status: 1};
    }
  }
  function draw_ball() {
    context.beginPath();
    context.arc(x, y, ball_radius, 0, Math.PI*2);
    context.fillStyle = color;
    context.fill();
    context.closePath();
  }
  function draw_blocks() {
    for(let c = 0; c < block_column_count; c++) {
      for(let r = 0; r < block_row_count; r++) {
        if (blocks[c][r].status == 1) {
          let block_x = (c * (block_width + block_padding)) + block_offset_left;
          let block_y = (r * (block_height + block_padding)) + block_offset_top;
          blocks[c][r].x = block_x;
          blocks[c][r].y = block_y;
          context.beginPath();
          context.rect(block_x, block_y, block_width, block_height); //block_width: 140 height:50
          context.fillStyle = '#0095dd';
          context.fill();
          context.closePath();
        }
      }
    }
  }
  function collision_detection() {
    for(var c = 0; c < block_column_count; c++) {
      for(var r = 0; r < block_row_count; r++) {
        let block = blocks[c][r];
        if(block.status == 1) {
          if(x > block.x - ball_radius && x < block.x + block_width + ball_radius
             && y > block.y - ball_radius && y < block.y + block_height + ball_radius) {
            dy = -dy;
            block.status = 0;
          }
        }
      }
    }
  }
  function draw() {
    context.clearRect(0, 0 , canvas.width, canvas.height);
    draw_blocks();
    draw_ball();
    if(x + dx > canvas.width - ball_radius || x + dx < 0 + ball_radius) {
      dx = -dx;
    }
    if(y + dy > canvas.height - ball_radius || y + dy < 0 + ball_radius) {
      dy = -dy;
    }
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
    collision_detection();
  }
  document.getElementById('start').addEventListener('click', draw, false);
}
