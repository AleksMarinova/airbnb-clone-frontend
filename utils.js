export const pluralize = (value) => {
if (value===0 || value>1) {
  return 's';
}
return '';
}