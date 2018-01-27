# Promise
Promise对象用于异步计算。一个Promise对象代表着一个还未完成，但预期将来会完成的操作。

#### promise对象有以下几种状态
- pending: 初始状态
- fulfilled: 成功的操作
- rejected: 失败的操作

当一个promise被调用时，初始是一个pending状态，此时将继续执行下面的代码，当promise状态为fulfilled时，promise.then绑定的方法将会被调用。当状态为rejected时，promise.catch方法会被调用。

1、Promise.prototype.then和Promise.prototype.catch方法返回Promises对象, 所以它们可以被链式调用。
2、promise.then()返回值是个promise对象时，将以这个promise的最终状态返回一个promise对象，如果返回值是一个值时，将以这个值为成功状态返回promise对象。

#### promise.resolve(value)
此方法返回一个以给定值解析后的 **promise对象**， 如果这个值是promise对象，返回的Promise对象会采用它的最终结果，否则以该值为成功状态返回promise对象。

#### promise.reject(value)
此方法返回一个被拒绝的Promise对象，可以被后续的catch捕获。


### 自己实现一个promise.all
Promise.all(values)方法返回一个Promise对象，该Promise会等values参数内的所有值都被resolve后才被resolve（values将会被并发执行），或以values参数内的第一个被reject的原因而被reject。

```
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

                // 每次resolve掉一个values就减一，如果所有的values被resolve掉，就返回一个promise.
                if(--residue === 0) {
                    reslove(result); // 把状态变为fulfilled
                }
            },reject);   
        }

        for (let i = 0; i<len; i++) {
            doReslove(i, values[i]);
        }
    });
}

let startTime = Data.now();
allPromise([,]).then(res => {
    console.log(Date.now() - startTime);
}).catch(err => {
    console.log(err);
});
```
[更多代码](index.js)







