   // Temel sahne, kamera ve render ayarları
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // Gölgeyi etkinleştir
    document.body.appendChild(renderer.domElement);

    // Zemin oluştur
const textureLoader = new THREE.TextureLoader();
const groundTexture = textureLoader.load('textures/duz.jpg'); // Zemine eklemek istediğiniz görselin yolu

// Zeminin görsel materyalini oluştur
const planeMaterial = new THREE.MeshStandardMaterial({ 
    map: groundTexture, // Texture ekleyin
    side: THREE.DoubleSide // Görselin her iki tarafında görünmesini sağlar
});

// PlaneGeometry oluştur
const planeGeometry = new THREE.PlaneGeometry(200, 200);
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // Zemin yatay olacak şekilde
plane.receiveShadow = true; // Zemin gölge alacak
scene.add(plane);

    // Rastgele silindirler ekle
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 10, 32);
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
for (let i = 0; i < 7; i++) {
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.x = (Math.random() - 0.5) * 50; // -90 ile 90 arası
    cylinder.position.z = (Math.random() - 0.5) * 50; // -90 ile 90 arası
    cylinder.position.y = 5; // Boyutun yarısı kadar yukarıda olsun (zemine değmesi için)
    cylinder.castShadow = true; // Gölge oluşturur
    scene.add(cylinder);
}

    // Directional Light ekle
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 30, 50); // Işığın pozisyonu
    directionalLight.castShadow = true; // Gölge oluşturur

    // Gölge ayarları
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.left = -30;
    directionalLight.shadow.camera.right = 30;
    directionalLight.shadow.camera.top = 30;
    directionalLight.shadow.camera.bottom = -30;

    scene.add(directionalLight);
    
    

    // Directional Light için helper ekle
    const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 5, 0xff0000); // Işık yönünü göster
    scene.add(lightHelper);

    // Gölge kamerasını görselleştirmek için helper ekleyebilirsiniz
    const shadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
    scene.add(shadowHelper);

    // Kamera pozisyonu
    camera.position.set(0, 20, 30);
    camera.lookAt(0, 0, 0);

    // OrbitControls ekle
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Daha yumuşak hareket
    controls.dampingFactor = 0.05;

    // Ekran boyutu değişirse yeniden boyutlandır
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animasyon döngüsü
    function animate() {
        requestAnimationFrame(animate);
        controls.update(); // OrbitControls'u güncelle
        renderer.render(scene, camera);
    }
    animate();
