router.post("/addFile", async (req, res, next) => {
  try {
    const uploadDir = path.join(__dirname, "resources");
    let form = formidable({ uploadDir, multiples: true });
    const [fields, files] = await form.parse(req);
    let { markup, select } = fields;
    let { cover, img1, img2, img3 } = files;
    let title;
    markup = markup.filter((f) => f.length > 0);
    const titleMatch = markup.toString().match(/^\*\*Title\*\*\:\s*(.+)$/m);
    if (titleMatch) title = titleMatch[1];
    const filePath = path.join(
      __dirname,
      "resources",
      select.toString(),
      title,
      "info.md"
    );
    await fs.mkdir(path.join(uploadDir, select.toString(), title), {
      recursive: true,
    });
    await fs.writeFile(filePath, markup, "utf-8");
    let fileObj = {
      cover: cover?.[0],
      image1: img1?.[0],
      image2: img2?.[0],
      image3: img3?.[0],
    };

    dirPath = path.join(__dirname, "resources", select.toString(), title);
    for (const [key, file] of Object.entries(fileObj)) {
      if (!file) return;
      const ext = path.extname(file.originalFilename);
      await fs.rename(file.filepath, dirPath + `/${key}.${ext}`);
    }
    res.sendFile(__dirname + "/public/listing.html");
  } catch (err) {
    next(err);
  }
});
