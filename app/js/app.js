window.addEventListener('load', () => {
    let bound = 0;
    let countClearAnim = 0;
    const container = document.querySelector('.container');
    const back_mountain = document.querySelector('.back_mountain');
    const front_mountain = document.querySelector('.front_mountain');
    const back_trees = document.querySelector('.back_trees');
    const front_trees = document.querySelector('.front_trees');

    container.addEventListener('mousemove', moveBackground);
    let xOld = 0;
    let yOld = 0;

    function moveBackground(e) {
        clearTimeout(bound);
        let xNew = e.screenX;
        setTimeout(() => {
            if (xNew > xOld) { // вправо
                back_mountain.style.left = `-110px`;
                front_mountain.style.left = `-95px`;
                back_trees.style.left = `-70px`;
                front_trees.style.left = `-60px`;
            } else { // влево
                back_mountain.style.left = `-90px`;
                front_mountain.style.left = `-60px`;
                back_trees.style.left = `-25px`;
                front_trees.style.left = `0`;
            }

            let yNew = e.screenY;
            if (yNew > yOld) { // вниз
                back_mountain.style.bottom = `-145px`;
                front_mountain.style.bottom = `-155px`;
                back_trees.style.bottom = `-5px`;
                front_trees.style.bottom = `60px`;
            } else { // вверх
                back_mountain.style.bottom = `-165px`;
                front_mountain.style.bottom = `-180px`;
                back_trees.style.bottom = `-70px`;
                front_trees.style.bottom = `0`;
            }
            xOld = e.screenX;
            yOld = e.screenY;
        }, 10)
        clearTimeout(countClearAnim);
        countClearAnim = setTimeout(() => {
            clearTagStyle([back_mountain, front_mountain, back_trees, front_trees]);
        }, 2000)
    }



    function clearTagStyle(el) {
        el.forEach(item => item.removeAttribute('style'));
    }
});