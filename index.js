const execute = (delay) => {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            reslove(2);
        },delay);
    });
};

const startTime = Date.now();

//串行开始，执行5s
execute(2000).then((res)=>{
    console.log(res);
    return execute(3000);
}).then((res) => {
    console.log(res);
    console.log(Date.now() - startTime);
});

// 并发开始，执行3s；
// Promise.all([execute(2000),execute(3000)]).then((res) => {
//     console.log(res);
//     console.log(Date.now() - startTime);
// });

// 自己实现primise.all
function allPromise(values) {
    // 校验values是否是个数组
    if(!Array.isArray(values)) {
        return new Promise.reject(new Error(' Promise.all must be provided an Array '))
    }

    return new Promise((reslove, reject) => {
        if(values.length === 0) {
            return;
        }

        let result = []; 
        let len = values.length;
        let residue = len;

        function doReslove(index, value) {
            Promise.resolve(value).then(res => {
                result[index] = res;

                if(--residue === 0) {
                    reslove(result);
                }
            },reject);   
        }

        for (let i = 0; i<len; i++) {
            doReslove(i, values[i]);
        }
    });
}


allPromise([execute(2000), execute(3000)]).then(res => {
    console.log(Date.now() - startTime);
});




