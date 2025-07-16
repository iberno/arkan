import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  // Roles
  const adminRole = await prisma.role.create({
    data: { name: 'admin', description: 'Acesso total ao sistema' },
  });

  const editorRole = await prisma.role.create({
    data: { name: 'editor', description: 'Pode editar recursos' },
  });

  const viewerRole = await prisma.role.create({
    data: { name: 'viewer', description: 'Pode visualizar recursos' },
  });

  // Permissions
  const permissions = await prisma.permission.createMany({
    data: [
      { name: 'view_dashboard', description: 'Visualizar painel' },
      { name: 'edit_user', description: 'Editar usuários' },
      { name: 'delete_user', description: 'Excluir usuários' },
      { name: 'create_post', description: 'Criar publicações' },
      { name: 'delete_post', description: 'Excluir publicações' },
    ],
  });

  // Relacionar permissões aos papéis
  const allPermissions = await prisma.permission.findMany();

  await prisma.rolePermission.createMany({
    data: allPermissions.map(p => ({
      roleId: adminRole.id,
      permissionId: p.id,
    })),
  });

  await prisma.rolePermission.createMany({
    data: allPermissions
      .filter(p => ['create_post', 'delete_post'].includes(p.name))
      .map(p => ({
        roleId: editorRole.id,
        permissionId: p.id,
      })),
  });

  await prisma.rolePermission.createMany({
    data: allPermissions
      .filter(p => p.name === 'view_dashboard')
      .map(p => ({
        roleId: viewerRole.id,
        permissionId: p.id,
      })),
  });

  // Usuários
  const users = await prisma.user.createMany({
    data: [
      { name: 'Admin Geral', email: 'admin@api.com', password: 'hash1' },
      { name: 'Dev Frontend', email: 'dev1@api.com', password: 'hash2' },
      { name: 'Dev Backend', email: 'dev2@api.com', password: 'hash3' },
      { name: 'Tester QA', email: 'qa@api.com', password: 'hash4' },
    ],
  });

  const allUsers = await prisma.user.findMany();

  await prisma.userRole.createMany({
    data: [
      { userId: allUsers[0].id, roleId: adminRole.id },
      { userId: allUsers[1].id, roleId: viewerRole.id },
      { userId: allUsers[2].id, roleId: editorRole.id },
      { userId: allUsers[3].id, roleId: viewerRole.id },
    ],
  });

  console.log('✅ Seed RBAC executado com sucesso!');
}

seed()
  .catch(e => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
