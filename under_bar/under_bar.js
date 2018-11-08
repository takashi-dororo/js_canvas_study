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
      color = "rgb(" + r + "," + g + "," + b + ")",
      score = 0, // 得点
      lifes = 3; // ライフ
  let myReq;
  // blockの設定値
  const block_padding = 10,
        block_offset_top = 30,
        block_offset_left = 30,
        block_column_count = 9,
        block_row_count = 8,
        margin = ((block_offset_left * 2) + (block_padding * (block_column_count - 1))),
        block_width = (canvas.width - margin) / block_column_count,
        block_height = 25;
  // blockオブジェクト カラムx軸に５　ロウy軸に４個？
  let blocks = [];
  for(let c = 0; c < block_column_count; c++) {
    blocks[c] = [];
    for(let r = 0; r < block_row_count; r++) {
      blocks[c][r] = { x: 0, y: 0, status: 1};
    }
  }
  // パドルの設定値
  const bar_height = 15,
        bar_width = 100;
  let bar_x = (canvas.width - bar_width) / 2;

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
            score += 100;
            if(score == block_column_count * block_row_count * 100) {
              alert("winner!winner!chicken dinner!!");
              document.location.reload();
            }
          }
        }
      }
    }
  }
  // パドルを描画
  function draw_bar() {
    context.beginPath();
    // rect(bar_x, 785, 75, 15)
    context.rect(bar_x, canvas.height - bar_height, bar_width, bar_height);
    context.fillStyle = color;
    context.fill();
    context.closePath();
  }
  function key_down_handler(e) {
    if(e.keyCode == 39) {
      if(bar_x < canvas.width - bar_width) {
        bar_x += 20;
      }
    } else if(e.keyCode == 37) {
      if(bar_x > 0) {
        bar_x -= 20;
      }
    }
  }
  document.addEventListener('keydown', key_down_handler, false);
  // マウスで動かす
  function mouse_move_handler(e) {
    let relativeX = e.clientX - canvas.offsetleft;
    if(relativeX > 0 && relativeX < canvas.width) {
      bar_x = relativeX - bar_width / 2;
    }
  }
  document.addEventListener('mousemove', mouse_move_handler, false);
  // スコアを定義
  function draw_score() {
    context.font = "16px Arial";
    context.fillStyle = "#0095DD";
    context.fillText("score: " + score, 10, 20); //後の二つのパラメーターは座標
  }
  // ライフを定義
  function draw_lives() {
    context.font = "16px Arial";
    context.fillstyle = "red";
    context.fillText("Life: " + lifes, canvas.width -80, 20);
  }
  function draw() {
    context.clearRect(0, 0 , canvas.width, canvas.height);
    draw_blocks();
    draw_ball();
    draw_bar();
    draw_score();
    draw_lives();
    collision_detection();
    if(x + dx > canvas.width - ball_radius || x + dx < 0 + ball_radius) {
      dx = -dx;
    }
    if(y + dy < ball_radius) {
      dy = -dy;
    } else if(x > bar_x - ball_radius && x < bar_x + bar_width + ball_radius
      && y + dy == canvas.height - bar_height -ball_radius) {
      dy = -dy;
      //1pxくらい浮いて見える
    } else if(y + dy > canvas.height - ball_radius) {
      lifes--;
      if(!lifes) {
        alert('GAME OVER...');
        document.location.reload();
      } else {
        // ボールの位置をリセット
        x = canvas.width / 2;
        y = canvas.height - 25;
        dx = 2;
        dy = -2;
        bar_x = (canvas.width - bar_width) / 2;
      }
    }
    x += dx;
    y += dy;
    myReq = requestAnimationFrame(draw);
  }
  function stop() {
    cancelAnimationFrame(myReq);
  }
  document.getElementById('start').addEventListener('click', draw, false);
  document.getElementById('stop').addEventListener('click', stop, false);
}
