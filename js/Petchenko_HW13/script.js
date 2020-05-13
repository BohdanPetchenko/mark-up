async function speedtest(getPromise, count, parallel = 1) {
    let duration = 0,
        parallelDuration = 0,
        parallelSpeed = 0,
        queryDuration = 0,
        querySpeed = 0;

    let querySpeedSet = [],
        parallelSpeedSet = [],
        queryDurationSet = [],
        parallelDurationSet = [];

    let durationTimeStart = performance.now();

    for (let i = 0; i < count; i++) {
        let promises = [];
        for (let j = 0; j < parallel; j++) {
            promises.push(new Promise((resolve) => {
                getPromise().then(res => resolve(res));
            }));
            if (j === parallel - 1) {

                let queryDurationTimeStart = performance.now();
                let querySpeedTimeStart = queryDurationTimeStart;

 
                await Promise.all(promises).then(responses => {
                    responses.forEach(
                        response => console.log(`${response.url}: ${response.status}`));
                });

                let querySpeedTimeEnd = performance.now();
                let queryDurationTimeEnd = querySpeedTimeEnd;

                querySpeedSet.push((querySpeedTimeEnd - querySpeedTimeStart) / (parallel * 1000));
                parallelSpeedSet.push(querySpeedSet[querySpeedSet.length - 1] * parallel);
                queryDurationSet.push((queryDurationTimeEnd - queryDurationTimeStart) / parallel);
                parallelDurationSet.push(queryDurationSet[queryDurationSet.length - 1] / parallel);
            }
        }
    }

    duration = performance.now() - durationTimeStart;

    querySpeed = querySpeedSet.reduce((a, b) => a + b, 0) / querySpeedSet.length;
    parallelSpeed = parallelSpeedSet.reduce((a, b) => a + b, 0) / parallelSpeedSet.length;
    queryDuration = queryDurationSet.reduce((a, b) => a + b, 0) / queryDurationSet.length;
    parallelDuration = parallelDurationSet.reduce((a, b) => a + b, 0) / parallelDurationSet.length;

    return {
        duration,
        querySpeed,
        queryDuration,
        parallelSpeed,
        parallelDuration
    };
}
// const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))
// speedtest(() => delay(1000), 10, 10 ).then(result => console.log(result))

// {duration: 10000, 
// querySpeed: 0.001, //1 тысячная запроса за миллисекунду
// queryDuration: 1000, //1000 миллисекунд на один реальный запрос в среднем 
// parallelSpeed: 0.01  // 100 запросов за 10000 миллисекунд
// parallelDuration: 100 // 100 запросов за 10000 миллисекунд
speedtest(() => fetch('http://swapi.dev/api/people/1'), 10, 5).then(res => console.log(res));

