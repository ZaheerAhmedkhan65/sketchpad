class SketchPad {
    constructor(container, size = 400) {
        this.container = container;
        this.canvas = document.createElement("canvas");
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style = `
        background-color: white;
        box-shadow: 0 0 10px 2px black;
        `;
        this.container.appendChild(this.canvas);

        const lineBreak = document.createElement("br");
        container.appendChild(lineBreak);
        this.undoBtn = document.createElement("button");
        this.undoBtn.innerHTML = "Undo";
        container.appendChild(this.undoBtn);
        this.ctx = this.canvas.getContext("2d");
        this.color = "black"; // Default color
        this.reset();
        this.#addEventListeners();
    }
    
    setColor(newColor) {
        this.color = newColor;
    }

    reset() {
        this.paths = [];
        this.isDrawing = false;
        this.#reDraw();
    }

    #addEventListeners() {
        this.canvas.onmousedown = (evt) => {
            const mouse = this.#getMouse(evt);
            this.paths.push({ color: this.color, points: [mouse] }); // Include color in paths
            this.isDrawing = true;
        };

        this.canvas.onmousemove = (evt) => {
            if (this.isDrawing) {
                const mouse = this.#getMouse(evt);
                const lastPath = this.paths[this.paths.length - 1];
                lastPath.points.push(mouse);
                this.#reDraw();
            }
        };

        document.onmouseup = () => {
            this.isDrawing = false;
        };

        this.canvas.ontouchstart = (evt) => {
            const loc = evt.touches[0];
            this.canvas.onmousedown(loc);
        };
        this.canvas.ontouchmove = (evt) => {
            const loc = evt.touches[0];
            this.canvas.onmousemove(loc);
        };
        document.ontouchend = () => {
            document.onmouseup();
        };

        this.undoBtn.onclick = () => {
            this.paths.pop();
            this.#reDraw();
        };
    }

    #reDraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const path of this.paths) {
            draw.path(this.ctx, path.points, path.color); // Pass color to draw.path
        }

        this.undoBtn.disabled = this.paths.length === 0;
    }

    #getMouse(evt) {
        const rect = this.canvas.getBoundingClientRect();
        return [
            Math.round(evt.clientX - rect.left),
            Math.round(evt.clientY - rect.top),
        ];
    }
}
