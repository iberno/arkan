import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  try {
    console.log('🚀 Iniciando o seed do Arkan...');

    // 📌 Criação de roles via upsert
    const rolesData = [
      { name: 'admin', description: 'Acesso total ao sistema' },
      { name: 'editor', description: 'Pode editar recursos' },
      { name: 'viewer', description: 'Pode visualizar recursos' },
    ];

    for (const role of rolesData) {
      await prisma.role.upsert({
        where: { name: role.name },
        update: {},
        create: role,
      });
    }

    const adminRole = await prisma.role.findUnique({ where: { name: 'admin' } });
    const editorRole = await prisma.role.findUnique({ where: { name: 'editor' } });
    const viewerRole = await prisma.role.findUnique({ where: { name: 'viewer' } });

    console.log('✅ Roles criadas/upsertadas');

    // 📌 Criação de permissões
    await prisma.permission.createMany({
      data: [
        { name: 'view_dashboard', description: 'Visualizar painel' },
        { name: 'edit_user', description: 'Editar usuários' },
        { name: 'delete_user', description: 'Excluir usuários' },
        { name: 'create_post', description: 'Criar publicações' },
        { name: 'delete_post', description: 'Excluir publicações' },
      ],
      skipDuplicates: true
    });

    const allPermissions = await prisma.permission.findMany();
    console.log('✅ Permissões criadas');

    // 📌 Associação de permissões aos papéis
    const buildRolePermissions = (roleId: number, permissionNames: string[]) =>
      allPermissions
        .filter((perm) => permissionNames.includes(perm.name))
        .map((perm) => ({ roleId, permissionId: perm.id }));

    await prisma.rolePermission.createMany({
      data: buildRolePermissions(adminRole!.id, allPermissions.map(p => p.name)),
      skipDuplicates: true
    });

    await prisma.rolePermission.createMany({
      data: buildRolePermissions(editorRole!.id, ['create_post', 'delete_post']),
      skipDuplicates: true
    });

    await prisma.rolePermission.createMany({
      data: buildRolePermissions(viewerRole!.id, ['view_dashboard']),
      skipDuplicates: true
    });

    console.log('✅ Permissões associadas aos papéis');

    // 📌 Criação de usuários via upsert
    const usersData = [
      { name: 'Admin Geral', email: 'admin@api.com', password: 'hash1' },
      { name: 'Dev Frontend', email: 'dev1@api.com', password: 'hash2' },
      { name: 'Dev Backend', email: 'dev2@api.com', password: 'hash3' },
      { name: 'Tester QA', email: 'qa@api.com', password: 'hash4' },
    ];

    for (const user of usersData) {
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: user
      });
    }

    console.log('✅ Usuários criados/upsertados');

    // 📌 Associação de papéis aos usuários
    const userAdmin = await prisma.user.findUnique({ where: { email: 'admin@api.com' } });
    const userViewer = await prisma.user.findUnique({ where: { email: 'dev1@api.com' } });
    const userEditor = await prisma.user.findUnique({ where: { email: 'dev2@api.com' } });
    const userQA     = await prisma.user.findUnique({ where: { email: 'qa@api.com' } });

    await prisma.userRole.createMany({
      data: [
        { userId: userAdmin!.id, roleId: adminRole!.id },
        { userId: userViewer!.id, roleId: viewerRole!.id },
        { userId: userEditor!.id, roleId: editorRole!.id },
        { userId: userQA!.id, roleId: viewerRole!.id },
      ],
      skipDuplicates: true
    });

    console.log('✅ Papéis atribuídos aos usuários');
    console.log('🎉 Seed RBAC concluído com sucesso!');
  } catch (error: any) {
    console.error('❌ Erro durante o seed:', error.message);
    console.error('🔍 Stack:', error.stack);
    console.dir(error, { depth: null });
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
