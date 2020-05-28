//密码强度逻辑
export function checkStrong(sValue) {
    let modes = 0;
    if (sValue.length < 1) return modes;
    if (/\d/.test(sValue)) modes++; //数字
    if (/[a-z]/.test(sValue)) modes++; //小写
    if (/[A-Z]/.test(sValue)) modes++; //大写
    if (/\W/.test(sValue)) modes++; //特殊字符

    //逻辑处理
    switch (modes) {
        case 1:
            return 1;
            break;
        case 2:
            return 2;
            break;
        case 3:
        case 4:
            return sValue.length < 10 ? 3 :4
            break;
    }
    return  modes;
}