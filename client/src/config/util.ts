export function isAuthenticated(): boolean {
  const authDtoString = localStorage.getItem('authDto');
  if (!authDtoString) return false;
  const authDto = JSON.parse(localStorage.getItem('authDto'));
  if (!authDto) return false;
  return Object.values(authDto).every(value => value);
}
