async function addImageProcess(src) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
    })
}

async function generatePdf(img, frontWall, sideWall, bath, shelf, floor) {
    const doc = new jsPDF();
    const spacing = 7;
    const bullet = 15;
    doc.addFileToVFS("kozgopr6n-medium-normal.ttf", jpFontNormal)
    doc.addFont("kozgopr6n-medium-normal.ttf", "kozgopr6nNormal", "normal");
    doc.setTextColor('gray')

    const normalFont = 'kozgopr6nNormal'
    doc.setFont( normalFont, "normal");

    const date = new Date()

    const href = window.location.href;

    const headerImg = await addImageProcess(href + '/assets/images/header-pdf.png');
    const logoImg = await addImageProcess(href + '/assets/images/h_logo.png');
    const wallImg = await addImageProcess(href + '/' + img.wall);
    const bathImg = await addImageProcess(href + '/' + img.bath);
    const shelfImg = await addImageProcess(href + '/' + img.shelf);
    const floorImg = await addImageProcess(href + '/' + img.floor);

    let x = 2;
    let y = 3;

    const endX = 206;

    doc.addImage(headerImg, 'png', x, y, endX, 30);

    y += 33
    doc.addImage(wallImg, 'png', x + 35, y , 140, 130);
    doc.addImage(bathImg, 'png', x + 35, y , 140, 130);
    doc.addImage(shelfImg, 'png', x + 35, y , 140, 130);
    doc.addImage(floorImg, 'png', x + 35, y , 140, 130);

    y += 138

    doc.setFontSize(11);
    doc.text('画像はイメージのため実物とは異なります。', endX - 5, y, 'right');

    y += 4
    doc.setDrawColor(136, 136, 136);
    doc.setLineWidth(0.6);

    doc.line(x, y, endX, y);

    y += 3;

    addBullet(x + 10,  y, '仕様');

    y += bullet;
    doc.text('PZシリーズ／サイズ : 1620', x + 10, y);
    y += spacing;
    doc.text('アクアシアター＋フルデジタルサウンドシステム', x + 10, y);
    y += bullet;

    addBullet(x + 10,  y, 'カラー');

    doc.text('色によって価格は異なります。', x + 50, y + 5);
    y += bullet;
    doc.text('壁', x + 10, y);
    doc.text(':' + frontWall + '/' + sideWall, x + 40, y);
    y += spacing;
    doc.text('浴槽', x + 10, y);
    doc.text(':' + bath, x + 40, y);
    y += spacing;
    doc.text('カウンター', x + 10, y);
    doc.text(':' + shelf, x + 40, y);
    y += spacing;
    doc.text('床', x + 10, y);
    doc.text(':' + floor, x + 40, y);

    y += 15;
    doc.setFillColor(118,110,178);
    doc.rect(x, y, endX, 3, 'F');

    y += spacing
    doc.setFillColor(136,136,136);
    doc.rect(x + 35, y, 1, 15, 'F');
    doc.rect(x + 65, y, 1, 15, 'F');
    doc.rect(x + 135, y, 1, 15, 'F');
    y += 3;
    doc.setFontSize(8);
    doc.text('date', x + 37, y);
    doc.text('showRoom', x + 67, y);
    doc.text('tel', x + 107, y);
    doc.text('担当', x + 137, y);

    doc.addImage(logoImg, 'png', 160, y - 3, 37, 6);

    y += 10;
    doc.setFontSize(13);
    doc.text('様', x + 34, y, 'right');
    doc.setFontSize(9);
    doc.text(`${date.getFullYear()}/${('0' + (date.getMonth() + 1)).slice(-2)}/${('0' + date.getDate()).slice(-2)}`, x + 37, y - 1);

    doc.save("a4.pdf");

    function addBullet(_x, _y, content) {
        doc.setFillColor(136, 136, 136);
        doc.rect(_x, _y, 5, 5, 'F');
        doc.setFontSize(15);
        doc.text(content, _x + 8, _y + 5);
        doc.setFontSize(11);
    }

}