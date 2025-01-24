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
        const lineBraek = document.createElement("br");
        container.appendChild(lineBraek);
        this.undoBtn = document.createElement("button");
        this.undoBtn.innerHTML= "Undo";
        container.appendChild(this.undoBtn);
        
        this.ctx = this.canvas.getContext("2d");
        this.reset();
        this.#addEventListeners();
    }
    
    reset() {
        this.paths= [];
        this.isDrawing = false;
        this.#reDraw();
    }

    #addEventListeners() {
        this.canvas.onmousedown = (evt) => {
            const mouse = this.#getMouse(evt);
            this.paths.push([mouse]);
            this.isDrawing = true;
        }
        this.canvas.onmousemove = (evt) => {
            if (this.isDrawing) {
                const mouse = this.#getMouse(evt);
                const lastPath = this.paths[this.paths.length - 1];
                lastPath.push(mouse);
                this.#reDraw();
            }
        }

        document.onmouseup = () => {
            this.isDrawing = false;
        }

        this.canvas.ontouchstart= (evt) => {
            const loc = evt.touches[0];
            this.canvas.onmousedown(loc);
        }
        this.canvas.ontouchmove = (evt) => {
            const loc = evt.touches[0];
            this.canvas.onmousemove(loc)
        }
        document.ontouchend = () =>{
            document.onmouseup
        }

        this.undoBtn.onclick = () => {
            this.paths.pop();
            this.#reDraw();
        }
    }

    #reDraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        draw.paths(this.ctx, this.paths);
        if(this.paths.length == 0){
            this.undoBtn.disabled = true;
        }else{
            this.undoBtn.disabled = false;
        }
    }
    #getMouse = (evt) => {
        const rect = this.canvas.getBoundingClientRect();
        return [
            Math.round(evt.clientX - rect.left),
            Math.round(evt.clientY - rect.top)
        ];
    }
}
