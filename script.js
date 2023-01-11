class calcu {
    constructor(oldTextElement, newTextElement) {
        this.oldTextElement = oldTextElement;
        this.newTextElement = newTextElement;
        this.clear()   
    }
    clear() {
        this.old = ""
        this.new = ""
        this.operation = ""
        this.newHistory = []
        this.oldHistory = []
        this.page = -1;
        this.position = 0;
    }
    del() {
        if(this.position == this.new.length) {
            return
        }
        else if(this.new == "") {
            this.new = this.old.toString()
            this.old = ""
            this.operation = ""
            return
        } else {
        this.new = this.new.slice(0, (this.new.length -1 - this.position)) + this.new.slice(this.new.length - this.position)
        } 
    }
    appendNumber(number) {
        let k = this.new.length - this.position
        if(number == "." && this.new.includes(".")) {
            return
        } else if(this.position == this.new.length && number == 0) {
            return
        } else {
    this.new = this.new.toString().slice(0, k) + number.toString() + this.new.toString().slice(k)
    if( this.operation.length == 0) {
        this.old = ""
    } }
    }
    selectOperation(ope) {
    this.compute(ope);
  }
    compute(x) {
        this.position = 0;
        if(this.new == "") {
            this.operation = x
            return
        } else {
        if(this.operation == "") {
            this.old = this.new
            this.new = ""
            this.operation = x 
            return 
           };
           this.newHistory.unshift(`${this.old} ${this.operation} ${this.new}`)
           console.log(this.newHistory[0])
             if(this.operation == "+") {
             this.old = Number(this.old) + Number(this.new)
             } else if(this.operation == "-") {
                 this.old = Number(this.old) - Number(this.new)
                 } else if(this.operation == "*") {
                     this.old = Number(this.old) * Number(this.new)
                     } else if(this.operation == "/") {
                         this.old = Number(this.old) / Number(this.new)
                         }
            this.operation = x
            this.new = ""
            this.oldHistory.unshift(`${this.old}`)
            console.log(this.oldHistory)
                        }
    }
    goBack() {
     if(this.page < this.newHistory.length - 1) {
        this.page++
        calcula.oldTextElement.innerText = calcula.oldHistory[this.page];
        calcula.newTextElement.innerText = calcula.newHistory[this.page];
        return
     }
    }
    goForward() {
        if(this.page > 0) {
            this.page--;
         calcula.oldTextElement.innerText = calcula.oldHistory[this.page];
        calcula.newTextElement.innerText = calcula.newHistory[this.page];
        return
        }
        this.output()
    }
    posBack() {
        if(this.position <= this.new.length) {
        this.position++
        }
    }
    posNext() {
        if(this.position > 0) {
            this.position--
        }
    }
    output() {
        this.page = -1;
   this.newTextElement.innerText = this.new.toString().slice(0, (this.new.length - this.position)) + "|" + this.new.toString().slice(this.new.length - this.position);
   if(this.old.length < 1) {
    this.oldTextElement.innerText = ""
   } else {
   this.oldTextElement.innerText = `${this.old} ${this.operation}`
    }}
}
const numButtons = document.querySelectorAll("[Data-num]")
const opButtons = document.querySelectorAll("[Data-op]")
const equButton = document.querySelector("[Data-equ]")
const acButton = document.querySelector("[Data-ac]")
const delButton = document.querySelector("[Data-del]")
const oldTextElement = document.querySelector("[Data-old]")
const newTextElement = document.querySelector("[Data-new]")
const backward = document.querySelector("[Data-backward]")
const forward = document.querySelector("[Data-forward]")
const backButton = document.querySelector("[Data-back]")
const nextButton = document.querySelector("[Data-next]")

const calcula = new calcu(oldTextElement, newTextElement)

numButtons.forEach( a => a.addEventListener("click", () => {
    calcula.appendNumber(a.innerText)
    calcula.output()
}))
acButton.addEventListener("click", () => {
    calcula.clear()
    calcula.output()
})
delButton.addEventListener("click", () => {
    calcula.del();
    calcula.output()
})
opButtons.forEach( a => a.addEventListener("click", () => {
    calcula.selectOperation(a.innerText);
    calcula.output();
}))
equButton.addEventListener("click", () => {
    calcula.compute("");
    calcula.output()
})
backward.addEventListener("click", () => {
    if(calcula.newHistory.length == 0) {
        return
    } else {
      calcula.goBack()
    }
    })
forward.addEventListener("click", () => {
        calcula.goForward()
    })
backButton.addEventListener("click", () => {
    calcula.posBack()
    calcula.output()
})
nextButton.addEventListener("click", () => {
    calcula.posNext()
    calcula.output()
})

window.addEventListener("keydown", (a) => {
    console.log(a.key)
    if(!isNaN(a.key)) {
        // calcula.appendNumber(a.key)
        // calcula.output()
        numButtons.forEach(b => {
            if(a.key == b.innerText) {
                b.click();
                b.classList.add("active");
                setTimeout(function() { 
                    b.classList.remove("active");
                  }, 300);
            }
        })
    } else if(/[\+\-\/\*]/.test(a.key)) {
        // calcula.selectOperation(a.key);
        // calcula.output();
        opButtons.forEach(b => {
            if(a.key == b.innerText) {
                b.click();
                b.classList.add("active");
                setTimeout(function() { 
                    b.classList.remove("active");
                  }, 400);
                }
            })
    } else if(a.key == "=" || a.key == "Enter") {
        a.preventDefault();
        equButton.click();
        equButton.classList.add("active");
        setTimeout(function() { 
            equButton.classList.remove("active");
          }, 500);
    } else if(a.key == "Backspace") {
        a.preventDefault();
        delButton.click();
        delButton.classList.add("active");
        setTimeout(function() { 
            delButton.classList.remove("active");
          }, 600);
    } else if(a.key == "ArrowLeft") {
        a.preventDefault();
        backward.click();
        backward.classList.add("active");
        setTimeout(function() { 
            backward.classList.remove("active");
          }, 500);
    } else if(a.key == "ArrowRight") {
        a.preventDefault();
        forward.click();
        forward.classList.add("active");
        setTimeout(function() { 
            forward.classList.remove("active");
          }, 500);
    } 
    })
 
