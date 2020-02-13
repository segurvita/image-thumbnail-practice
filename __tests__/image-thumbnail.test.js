const fs = require("fs").promises;
const imageThumbnail = require('image-thumbnail');
const tmp = require('tmp-promise');

// constant
const inputFilePath = 'resources/black_1024x1024.png';

describe('image-thumbnail', () => {
    test('From Path', async () => {
        // generate thumbnail data from path
        const thumbnailData = await imageThumbnail(inputFilePath);
        expect(thumbnailData).toBeDefined();

        // make tmp file path
        const tmpFilePath = tmp.tmpNameSync() + '.png';

        // write tmp file
        await fs.writeFile(tmpFilePath, thumbnailData);

        // read tmp file
        const tmpFileData = await fs.readFile(tmpFilePath);
        expect(tmpFileData).toBeDefined();

        // delete tmp file
        await fs.unlink(tmpFilePath);
    });

    test('From Base64', async () => {
        // read input file with base64
        const inputFileData = await fs.readFile(inputFilePath, 'base64');

        // generate thumbnail data from base64
        const thumbnailData = await imageThumbnail(inputFileData);
        expect(thumbnailData).toBeDefined();

        // make tmp file path
        const tmpFilePath = tmp.tmpNameSync() + '.png';

        // write tmp file
        await fs.writeFile(tmpFilePath, thumbnailData);

        // read tmp file
        const tmpFileData = await fs.readFile(tmpFilePath);
        expect(tmpFileData).toBeDefined();

        // delete tmp file
        await fs.unlink(tmpFilePath);
    });
});