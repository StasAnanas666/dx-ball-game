//мяч
class Ball {
    constructor(canvas) {
        this.canvas = canvas;//игровое поле
        this.ctx = this.canvas.getContext("2d");//двумерное пространство поля с координатами x и y
        this.radius = 10;//радиус мяча
        this.x = this.canvas.width / 2;//начальная позиция мяча по x - центр 
        this.y = this.canvas.height - 30;//начальная позиция мяча по y - над платформой
        this.dx = 2;//скорость и направление полета мяча по x, если значение положительное - летит вправо, отрицительное - влево
        this.dy = -2;//скорость и направление полета мяча по y, если значение положительное - летит вниз, отрицительное - вверх
    }

    //отрисовка
    draw() {
        this.ctx.beginPath();//начало рисования
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);//рисуем контур мяча
        this.ctx.fillStyle = "gold";//цвет заливки
        this.ctx.fill();//заливка мяча
        this.ctx.closePath();//окончание рисования
    }

    //движение мяча. метод будет вызываться постоянно для движения мяча
    update() {
        //если мяч долетел до левой или правой границы игрового поля - полетит в противоположном направлении
        if(this.x + this.dx > this.canvas.width - this.radius || this.x + this.dx < this.radius) {
            this.dx = -this.dx;
        }
        //если долетел до верхней границы - отскакивает в потивоположном направлении
        if(this.y + this.dy < this.radius) {
            this.dy = -this.dy;
        }
        //если внизу улетел ниже верхней границы платформы(не попал на платформу)
        else if(this.y + this.dy > this.canvas.height - this.radius - paddle.height) {
            //если попал в пределы платформы - отскакивает вверх
            if(this.x > paddle.x && this.x < paddle.x + paddle.width) {
                this.dy = -this.dy;
            }
        }
        this.x += this.dx;//перемещение мяча по x
        this.y += this.dy;//перемещение мяча по y
    }
}

//платформа
class Paddle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.width = 80;//ширина платформы
        this.height = 20;//высота платформы
        this.x = (this.canvas.width - this.width) / 2;//ставим платформу горизонтально по центру
        //координату y не указываем, т.о. платформа будет находиться внизу игрового поля
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.canvas.height - this.height, this.width, this.height);
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.closePath();
    }

    update() {
        //если нажимаем стрелку вправо и платформа не стоит у правого края - можем двигать вправо
        if(rightPressed && this.x < this.canvas.width - this.width) {
            this.x += 7;
        }
        //если нажимаем стрелку влево и платформа не стоит у левого края - можем двигать влево
        else if(leftPressed && this.x > 0) {
            this.x -= 7;
        }
    }
}

//класс блоков(кирпичи)
class Brick {
    constructor(canvas, x, y) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.width = 75;
        this.height = 20;
        this.x = x;
        this.y = y;
        this.status = 1;//статус 1 - кирпич еще не сталкивался с мячом, отрисовывается. статус 0 - мяч попал в кирпич, исчезает с игрового поля
    }

    draw() {
        if(this.status === 1) {
            this.ctx.beginPath();
            this.ctx.rect(this.x, this.y, this.width, this.height);
            this.ctx.fillStyle = "firebrick";
            this.ctx.fill();
            this.ctx.closePath();
        }
    }
}
