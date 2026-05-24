function toDegrees(radians) {
  return radians * 180 / Math.PI;
}

function calculateAngle() {
  const d = parseFloat(document.getElementById("d").value);
  const y = parseFloat(document.getElementById("y").value);
  const p = parseFloat(document.getElementById("p").value);
  const altitude = document.getElementById("altitude").value;
  const side = document.getElementById("side").value;
  const result = document.getElementById("result");

  result.innerHTML = "";

  // Validation
  if (isNaN(d) || isNaN(y) || isNaN(p)) {
    result.innerHTML =
      "<div class='error'>Please enter valid values.</div>";
    return;
  }

  if (Math.abs(y) > d) {
    result.innerHTML =
      "<div class='error'>Vertical separation y must be ≤ d.</div>";
    return;
  }

  // Step 3:
  // d' = d * cos(asin(y/d))
  const dPrime = d * Math.cos(Math.asin(y / d));

  // Step 5:
  // c = 0.0140143 * (1.297212032)^(10 - 0.1p)
  const c = 0.0140143 *
    Math.pow(1.297212032, (10 - (0.1 * p)));

  // Step 6:
  const a = c * dPrime;

  // Step 7:
  const b = c * y;

  // Step 8:
  let x;
  if (altitude === "higher") {
    x = (a * a) + (2 * b);
  } else {
    x = (a * a) - (2 * b);
  }

  if (x >= 1) {
    result.innerHTML =
      "<div class='error'>x must be less than 1. Adjust power.</div>";
    return;
  }

  // Step 9:
  const z = Math.sqrt(1 - x);

  // Step 10:
  let angle = toDegrees(
    Math.atan((z + 1) / a)
  );

  if (side === "right") {
    angle = 180 - angle;
  }

  result.innerHTML = `
    <div>d′ = ${dPrime.toFixed(6)}</div>
    <div>c = ${c.toFixed(8)}</div>
    <div>a = ${a.toFixed(6)}</div>
    <div>b = ${b.toFixed(6)}</div>
    <div>x = ${x.toFixed(6)}</div>
    <div>z = ${z.toFixed(6)}</div>

    <div class="final-angle">
      Angle = ${angle.toFixed(2)}°
    </div>
  `;
}
