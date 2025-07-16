const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function seed() {
  try {
    console.log('🚀 Iniciando o seed...');

    // 0) Limpa associações antes de apagar entidades
    await prisma.userRole.deleteMany();
    await prisma.rolePermission.deleteMany();

    // 1) Limpa tabelas principais
    await prisma.permission.deleteMany();
    await prisma.role.deleteMany();
    await prisma.user.deleteMany();

    // 2) Roles
    await prisma.role.createMany({
      data: [
        { name: 'admin',  description: 'Acesso total ao sistema' },
        { name: 'editor', description: 'Pode editar recursos' },
        { name: 'viewer', description: 'Pode visualizar recursos' },
      ]
    });
    const roles = await prisma.role.findMany();
    const roleMap = Object.fromEntries(roles.map(r => [r.name, r.id]));

    // 3) Permissions
    await prisma.permission.createMany({
      data: [
        { name: 'view_dashboard', description: 'Visualizar painel' },
        { name: 'edit_user',      description: 'Editar usuários' },
        { name: 'delete_user',    description: 'Excluir usuários' },
        { name: 'create_post',    description: 'Criar publicações' },
        { name: 'delete_post',    description: 'Excluir publicações' },
      ]
    });
    const allPerms = await prisma.permission.findMany();

    // 4) RolePermissions
    const buildRP = (roleName, permNames) =>
      allPerms
        .filter(p => permNames.includes(p.name))
        .map(p => ({ roleId: roleMap[roleName], permissionId: p.id }));

    await prisma.rolePermission.createMany({
      data: buildRP('admin', allPerms.map(p => p.name))
    });
    await prisma.rolePermission.createMany({
      data: buildRP('editor', ['create_post', 'delete_post'])
    });
    await prisma.rolePermission.createMany({
      data: buildRP('viewer', ['view_dashboard'])
    });

    // 5) Users com senha hash
    const usersRaw = [
      { name: 'Admin Geral',  email: 'admin@api.com',  password: 'admin123' },
      { name: 'Dev Frontend', email: 'dev1@api.com',   password: 'frontend123' },
      { name: 'Dev Backend',  email: 'dev2@api.com',   password: 'backend123' },
      { name: 'Tester QA',    email: 'qa@api.com',     password: 'qa123' },
    ];

    const usersHashed = await Promise.all(
      usersRaw.map(async (u) => ({
        name: u.name,
        email: u.email,
        password: await bcrypt.hash(u.password, 10),
      }))
    );

    await prisma.user.createMany({ data: usersHashed });
    const users = await prisma.user.findMany();
    const userMap = Object.fromEntries(users.map(u => [u.email, u.id]));

    // 6) UserRoles
    await prisma.userRole.createMany({
      data: [
        { userId: userMap['admin@api.com'], roleId: roleMap['admin'] },
        { userId: userMap['dev1@api.com'],  roleId: roleMap['viewer'] },
        { userId: userMap['dev2@api.com'],  roleId: roleMap['editor'] },
        { userId: userMap['qa@api.com'],    roleId: roleMap['viewer'] },
      ]
    });

    console.log('✅ Seed concluído com sucesso!');
  } catch (err) {
    console.error('❌ Erro no seed:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
