# Segunda fase — contas e sincronização segura

## Arquitetura proposta

Manter a interface e separar o acesso aos dados num módulo com a mesma API para armazenamento local e remoto. Adicionar um backend autenticado e PostgreSQL; uma opção adequada é Supabase (Auth, PostgreSQL com Row Level Security e Realtime). A escolha e a criação do serviço ficam para uma tarefa posterior. Não foram criadas contas nem serviços externos.

## Implementação por etapas

1. Criar ambientes separados de testes e produção. Guardar segredos apenas no servidor/configuração segura; nunca no repositório ou no JavaScript entregue ao navegador. A chave pública do cliente só pode ser usada com RLS ativo e permissões mínimas.
2. Criar tabelas `families`, `profiles`, `family_members`, `events`, `tasks`, `task_completions`, `shopping_items`, `meal_plans`, `notes`. Cada registo familiar recebe `family_id`, identificador UUID e datas de criação/alteração. As conclusões de tarefas são registos independentes por tarefa, pessoa e período, preservando histórico.
3. Implementar login, recuperação de acesso, sessão e saída. Criar convites de utilização única, expiráveis e restritos à família, sem registo público que permita entrar numa família arbitrária. Decidir com os responsáveis a gestão das contas dos menores.
4. Ativar RLS em todas as tabelas: só membros autenticados podem ler e alterar dados da sua família. A adesão à família e os convites exigem operações privilegiadas no servidor. As subscrições em tempo real respeitam as mesmas políticas.
5. Definir fuso horário familiar (por exemplo Europe/Lisbon), eventos de dia inteiro, regras de repetição e exceções, autorizações por função e semântica de conflitos. Usar versão do registo para evitar sobrescrever alterações concorrentes silenciosamente.
6. Substituir localStorage por operações autenticadas e subscrições Realtime. Mostrar estados de ligação, gravação, erro e conflito. Não enviar automaticamente os dados da demonstração: pedir uma importação explícita e validada depois do login.
7. Adicionar backups e testar restauro, exportação/eliminação de dados, minimização de registos de auditoria e política de retenção. Limpar caches privados ao terminar sessão. Adiar modo offline até definir conflitos e proteção do dispositivo.
8. Só depois publicar atrás de HTTPS e autenticação. Definir domínio e origens permitidas, proteção de sessão/CSRF conforme o modelo de autenticação, limites de pedidos e cabeçalhos de segurança. Validar sempre os dados no servidor.

## Critérios de aceitação antes de dados reais

- Um utilizador sem sessão não consegue ler ou alterar quaisquer registos familiares, incluindo acesso direto à API.
- Uma conta de outra família não consegue ler, alterar, subscrever ou deduzir os nossos dados. Testar todas as tabelas e operações.
- Convites expirados/reutilizados são rejeitados; um membro não pode atribuir a si próprio permissões de administrador.
- Duas sessões em dispositivos distintos veem as alterações sem atualizar a página; edições concorrentes têm um resultado explícito.
- A saída termina subscrições e remove dados privados em cache; credenciais privilegiadas não aparecem nos ficheiros públicos.
- Restaurar um backup funciona; testar telemóvel/tablet, teclado e leitor de ecrã e confirmar acessibilidade e tamanhos táteis.

Até estes critérios passarem, continuar apenas com dados de exemplo e acesso local.
