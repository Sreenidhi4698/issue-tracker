export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/issies/new', 'issue/edit:id+'],
};
