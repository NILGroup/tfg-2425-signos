const distanceTo = (x1, y1, x2, y2) => {
  // Distance between two points
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

export default distanceTo;
