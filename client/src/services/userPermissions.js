export const permissions = {
  admin: ['Users', 'Teams', 'Venues', 'Game Control'],
  operator: ['Game Control'],
};

export const isFullControl = (user) => user.type === 'admin';
