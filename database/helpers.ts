export function mergeObjectArray(array1: any, array2: any) {
  const array3 = [{}];
  for (let i = 0; i < array1.length; i++) {
    array3[i] = { ...array1[i], ...array2[i] };
  }
  return array3;
}
