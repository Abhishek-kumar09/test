fetch("https://api.github.com/repos/layer5labs/meshery-extensions-packages/releases").then(res => res.json()).then(res => {
    console.log({ res });
    console.log(res[0].tag_name)
});