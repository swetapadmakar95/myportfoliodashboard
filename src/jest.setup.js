import 'jest-canvas-mock';
// Mock HTMLCanvasElement.getContext
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    fillRect: jest.fn(),
    clearRect: jest.fn(),
    getImageData: jest.fn(),
    putImageData: jest.fn(),
    createImageData: jest.fn(),
    setTransform: jest.fn(),
    drawImage: jest.fn(),
    save: jest.fn(),
    fillText: jest.fn(),
    restore: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    closePath: jest.fn(),
    stroke: jest.fn(),
    translate: jest.fn(),
    scale: jest.fn(),
    rotate: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    measureText: jest.fn(() => ({ width: 0 })),
    strokeRect: jest.fn(),
    clip: jest.fn(),
  }));
  
jest.spyOn(console, 'error').mockImplementation((message) => {
    if (!message.includes('ReactDOMTestUtils.act is deprecated')) {
      console.error(message);
    }
});
  
  
global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };