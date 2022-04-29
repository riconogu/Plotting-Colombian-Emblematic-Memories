(function() {
  var canvas = document.getElementById('chart');
  var context = canvas.getContext('2d');

  function setup() {
    var height = canvas.height = canvas.parentNode.clientWidth; // use width for square aspect ratio
    var width = canvas.width = canvas.parentNode.clientWidth;
    var padding = 0;
    context.clearRect(0, 0, width, height);
    context.font = '18px sans-serif';
    drawGrid(width, height, 40, padding, 'white', 1);
    drawGrid(width, height, 2, padding, 'black', 2);
    var labels = [
      { text: 'Memoria Trájica', horizontal: 'left', vertical: 'top', x: width/ 11, y: height/ 13 },
      { text: '', horizontal: 'center',vertical: 'top', x: width / 2, y: 0 },
      { text: 'Memoria cruzada', horizontal: 'right', vertical: 'top', x: width/ 1.11, y: height/ 10 },
      { text: '', horizontal: 'left', vertical: 'middle', x: 0, y: height / 2 },
      // { text: 'Centerism', horizontal: 'center', vertical: 'middle', x: width / 2, y: height / 2 },
      { text: '', horizontal: 'right', vertical: 'middle', x: width, y: height / 2 },
      { text: 'Memoria indiferente', horizontal: 'left', vertical: 'bottom', x: width/ 11, y: height/ 1.11 },
      { text: '', horizontal: 'center', vertical: 'bottom', x: width / 2, y: height },
      { text: 'Memoria heróica', horizontal: 'right', vertical: 'bottom', x: width/ 1.10, y: height/ 1.09 },
    ];
    labels.forEach(function(label) {
      drawText(label, 10);
    });
  }

  function drawGrid(bw, bh, lines, pad, color, lineWidth) {
    var gap = (bw - (pad * 2)) / lines;
    context.beginPath();
    context.lineWidth = lineWidth;
    context.strokeStyle = color;
    for (var x = pad; x <= bw - pad; x += gap) {
      context.moveTo(x, pad);
      context.lineTo(x, bh - pad);
    }
    for (var y = pad; y <= bh - pad; y += gap) {
      context.moveTo(pad, y);
      context.lineTo(bw - pad, y);
    }
    context.stroke();
    context.closePath();
  }

  function drawLine(start, end) {
    context.beginPath();
    context.strokeStyle = '#333';
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
    context.closePath();
  }

  function drawText(item, pad) {
    context.save();
    context.textAlign = 'center';
    if (item.vertical === 'top') {
      item.y += pad;
      context.textBaseline = 'top';
      if (item.horizontal == 'left') {
        item.r = -45;
        item.x += pad * 4;
        item.y += pad * 3;
      }
      if (item.horizontal == 'right') {
        item.r = 45;
        item.x -= pad * 4;
        item.y += pad * 3;
      }
    }
    if (item.vertical === 'middle') {
      context.textBaseline = 'top';
      if (item.horizontal == 'left') {
        item.r = -90;
        item.x += pad;
      }
      if (item.horizontal == 'right') {
        item.r = 90;
        item.x -= pad;
      }
    }
    if (item.vertical === 'bottom') {
      item.y -= pad;
      context.textBaseline = 'bottom';
      if (item.horizontal == 'left') {
        item.r = 45;
        item.x += pad * 4;
        item.y -= pad * 3;
      }
      if (item.horizontal == 'right') {
        item.r = -45;
        item.x -= pad * 4;
        item.y -= pad * 3;
      }
    }
    context.translate(item.x, item.y);
    context.rotate(item.r * Math.PI / 180);
    context.fillStyle = '#454545';
    context.fillText(item.text, 0, 0);
    context.restore();
  }

  window.addEventListener('resize', function() {
    setup();
  });

  setup();
}());