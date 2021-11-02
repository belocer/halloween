window.addEventListener('load', () => {
    let bound = 0;
    let countClearAnim = 0;
    const container = document.querySelector('.container');
    const back_mountain = document.querySelector('.back_mountain');
    const front_mountain = document.querySelector('.front_mountain');
    const back_trees = document.querySelector('.back_trees');
    const front_trees = document.querySelector('.front_trees');
    const cloud = document.querySelector('.cloud');

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
                cloud.style.left = `-100px`;
                animateRight();
            } else { // влево
                back_mountain.style.left = `-90px`;
                front_mountain.style.left = `-60px`;
                back_trees.style.left = `-25px`;
                front_trees.style.left = `0`;
                cloud.style.left = `0`;
                animateLeft();
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

    /* Портал в конце пути, персоны */
    let person1 = document.querySelector('.person1');
    let portal = document.querySelector('.portal');
    let portal_right = document.querySelector('.portal_right');
    let debounce = 0;

    setInterval(() => {
        clearTimeout(debounce);
        let left_person = Math.floor(window.getComputedStyle(person1).left.replace('px', ''));
        if (left_person >= window.screen.width / 2 - 250) {
            open_portal();
        }
    }, 25);

    let switchI = true;
    function open_portal() {
        portal_right.classList.add('opacity1');
        portal.classList.add('opacity055');
        switchI ? showPortal() : '';
    }

    function showPortal() {
        switchI = false;
        let r = 200;
        let idInterval = setInterval(() => {
            r -= 4;
            portal.style.right = `-${r}px`;
            portal_right.style.right = `-${r}px`;
            if (r <= 5) {
                close_portal();
                clearInterval(idInterval);
            }
        }, 19);
    }

    function close_portal() {
        person1.style.left = '-300px';
        person1.style.animation = 'none';
        switchI = true;
        portal.style.right = ``;
        portal_right.style.right = ``;
        portal_right.classList.remove('opacity1');
        portal.classList.remove('opacity055');

        setTimeout(() => person1.style.animation = '', 1000);
    }

    /** 3D Object **/
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, 600 / 600, 0.1, 5000)
    camera.position.z = 10; // отдалим камеру по оси Z

    let renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setClearColor(0x000000, 0); // Прозрачность фона
    renderer.setSize(200, 200); // Размер канваса

    renderer.domElement.setAttribute('id', 'webgl3D'); // Добавляем на страницу
    let webgl = document.getElementById('webgl');
    webgl.appendChild(renderer.domElement);

    const aLight = new THREE.AmbientLight(0xb16d08, 2); // Добавляем свет в сцену
    scene.add(aLight);

    const pLight = new THREE.PointLight(0xffffff, 1.3);  // Позиция света
    pLight.position.set(1, 1, 1);
    scene.add(pLight);

    /*const helper = new THREE.PointLightHelper(pLight);
    scene.add(helper);*/

    let loader = new THREE.GLTFLoader();
    let obj = null;

    loader.load('../webgl/halloween_pumpkin/scene.gltf', function (gltf) {
        //loader.load('https://googleman.ru/hw/webgl/halloween_pumpkin/scene.gltf', function (gltf) {
        //loader.load('../webgl/stilized_building/scene.gltf', function (gltf) {
        obj = gltf;
        obj.scene.scale.set(0.03, 0.03, 0.03);

        scene.add(obj.scene)
    });
    animateRight();

    function animateRight() {
        //requestAnimationFrame(animateRight);

        if (obj)
            obj.scene.rotation.y += 0.012; // Скорость движения

        renderer.render(scene, camera);
    }

    function animateLeft() {
        //requestAnimationFrame(animateLeft);

        if (obj)
            obj.scene.rotation.y -= 0.009; // Скорость движения

        renderer.render(scene, camera);
    }

    animate();

    function animate() {
        requestAnimationFrame(animate);

        if (obj)
            obj.scene.rotation.y -= 0.001; // Скорость движения

        renderer.render(scene, camera);
    }
});