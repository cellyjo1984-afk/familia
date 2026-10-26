# Família Lemos — Organização Familiar

Demonstração funcional com **dados fictícios**, dois modos de apresentação e armazenamento local. HTML, CSS, JavaScript e Node.js 20+, sem dependências externas. Fonte arredondada Nunito incluída no projeto com a licença em `public/fonts/OFL.txt`.

## No Windows, passo a passo

1. Instale Node.js LTS em https://nodejs.org.
2. No GitHub do projeto, escolha **Code → Download ZIP** e depois **Extrair Tudo** no Windows. Para atualizar, use uma nova pasta e pare o servidor antigo com Ctrl+C.
3. Abra a pasta que contém `package.json`. Clique na barra do caminho da pasta, escreva `cmd` e prima Enter.
4. Escreva `npm start` e prima Enter. Não precisa de `npm install`.
5. Abra no Edge ou Chrome:
   - **Tablet/telemóvel (interativo):** `http://127.0.0.1:3000/?mode=tablet`
   - **TV (leitura):** `http://127.0.0.1:3000/?mode=tv`
6. Mantenha a janela preta aberta. Para parar, prima Ctrl+C nessa janela.

O seletor **Tablet / TV** alterna os modos e atualiza o endereço. O modo fica no endereço de cada separador: uma TV não muda o modo do tablet. O servidor arranca apenas na interface local; estes endereços são para o computador onde o comando foi executado. Na nuvem, localhost é a máquina na nuvem, não o seu Windows. Não há uma versão pública criada.

## O que experimentar

### Modo Tablet e telemóvel

- Calendário diário, semanal e mensal, com semana à segunda-feira, cores e nomes por pessoa.
- Criar, editar e eliminar compromissos individuais ou da família. Repetição semanal e mensal; alterações afetam toda a série. Datas mensais 29–31 são omitidas nos meses sem esse dia.
- Tarefas diárias, semanais e ocasionais, caixas para marcar, responsáveis, barras de progresso e histórico. As diárias renovam todos os dias; as semanais à segunda-feira. Eliminar uma tarefa elimina o seu histórico.
- Compras, notas/avisos e ementa com almoço/jantar da semana atual. Os avisos e o jantar aparecem na TV.

### Modo Televisão

- Painel próprio, sem ações de edição, com relógio atualizado a cada segundo e data atual.
- Compromissos de hoje e amanhã, tarefas pendentes e progresso das quatro pessoas.
- Avisos familiares e jantar de hoje. Edite-os em **A nossa casa** no modo Tablet.
- Ajuste automático a 16:9, testado em 1280×720, 1920×1080 e 3840×2160. O modo vertical permite deslocamento para continuar legível.
- As listas longas rodam automaticamente a cada 12 segundos, com indicador de página. Nenhum utilizador precisa de clicar para avançar. Títulos muito longos podem ser abreviados no painel; o texto completo está no Tablet.
- A mudança de dia é detetada automaticamente, sem ter de atualizar manualmente.

Para simular um tablet e uma TV no computador, abra os dois endereços em separadores do **mesmo navegador**. Marque uma tarefa no Tablet: a TV desse mesmo navegador atualiza automaticamente. Esta demonstração usa eventos de armazenamento local, **não é sincronização entre dispositivos**.

## Instalar como PWA

A aplicação tem manifesto, ícones 192/512 e service worker. Depois de uma primeira visita completa, o programa pode voltar a abrir offline; os dados continuam locais. A disponibilidade do botão de instalação depende do navegador.

- **Windows:** abra no Edge/Chrome e procure o ícone de instalação na barra de endereço ou a opção de instalar no menu.
- **Android:** Chrome → menu → **Instalar aplicação** ou **Adicionar ao ecrã principal**.
- **iPhone/iPad:** Safari → **Partilhar → Adicionar ao ecrã principal**.
- **TV:** abra o navegador e use o endereço terminado em `?mode=tv`; se não houver navegador compatível, ligue um computador por HDMI. O ecrã inteiro depende do navegador/TV. No Windows use F11 para ocultar as barras.

**Em telemóveis/tablets e TVs reais é necessário um endereço acessível por esses dispositivos.** `127.0.0.1` aponta sempre para o próprio dispositivo. Não o copie para o telemóvel esperando chegar ao PC. A PWA exige HTTPS fora de localhost; não abra simplesmente a porta do PC à Internet. O servidor local e os dados locais servem a demonstração, não uma instalação familiar privada em produção.

## Vários dispositivos e publicação segura

**Ainda não implementado:** contas, base de dados remota e sincronização entre dispositivos. A proposta é **Supabase Auth + PostgreSQL com RLS + Realtime**, conforme [FASE-2.md](FASE-2.md). Não é necessário criar serviços externos para experimentar a demonstração.

Para a fase privada, a sequência é:

1. Implementar primeiro o login por convite, as tabelas e políticas RLS. Desativar a adesão pública e impedir acesso sem sessão a todos os dados familiares. A TV deve ter uma conta própria com permissões de leitura aplicadas no backend; o simples modo TV da interface não é uma autorização de segurança.
2. Ligar as operações da interface e as subscrições Realtime ao utilizador autenticado. Mostrar ligação/perda de rede e conflitos. Não migrar os exemplos automaticamente.
3. Testar com contas fictícias de duas famílias: uma nunca pode ler/alterar os dados da outra, nem por API ou subscrição direta. Testar a conta de TV e o restauro de backups.
4. Escolher alojamento compatível com HTTPS e domínio próprio, configurar autenticação/URLs de retorno e os cabeçalhos de segurança. A política CSP atual só permite a própria origem; a integração deve permitir explicitamente apenas os destinos HTTPS/WSS do projeto Supabase. A chave privilegiada `service_role` nunca deve chegar ao navegador.
5. Rever o service worker antes da produção: apenas ficheiros públicos da interface em cache, nunca dados privados, tokens ou respostas de autenticação. Terminar subscrições e limpar dados privados ao sair.
6. Só depois disponibilizar o endereço privado da aplicação à família. Em cada telemóvel/tablet abrir `https://SEU-DOMINIO/?mode=tablet` e iniciar sessão; na TV `https://SEU-DOMINIO/?mode=tv` com a conta de leitura. Estes são exemplos de formato, não endereços já criados.
7. Instalar a PWA nos dispositivos compatíveis. Confirmar que uma alteração no tablet surge no telemóvel e na TV sem recarregar. Nenhuma porta local do PC precisa de ficar publicamente aberta.

Não basta enviar esta demonstração para um alojamento para obter proteção ou sincronização. **Nada foi publicado e nenhum serviço Supabase foi criado.**

## Dados e privacidade da demonstração

Use apenas exemplos. Os nomes identificam as pessoas da interface; eventos e conteúdos de teste são fictícios. Não há autenticação, recuperação ou cópia de segurança nesta versão. O modo TV é apenas uma apresentação de leitura da interface.

Os dados ficam em `localStorage`, por origem e perfil do navegador. Separadores da mesma origem/perfil partilham alterações; dispositivos e navegadores diferentes não. Alterar porta/endereço, limpar dados ou usar navegação privada pode esconder ou perder os registos. Alterações simultâneas em vários separadores seguem a última gravação; resolução de conflitos remotos fica para a fase Supabase. A data/hora seguem o dispositivo; sincronize os relógios e configure o mesmo fuso horário nos testes. A fase remota usará fuso horário familiar explícito.

## Desenvolvimento e validação

- `npm test`: testes das regras de repetição, tarefas, agenda da TV e paginação.
- `node --check public/app.js` e `node --check public/sw.js`: sintaxe.
- `npm start`: iniciar localmente. `PORT` permite escolher outra porta.
- Cache da demonstração: `familia-demo-v3`; incrementar a versão ao alterar o conjunto de ficheiros offline. Não serve dados de API.

Testes de aceitação manuais: abrir os dois modos, editar compromisso, marcar tarefa, verificar a atualização noutro separador, testar calendário e compras; criar mais de quatro compromissos e aguardar rotação; voltar a abrir offline após a primeira visita; testar 16:9 e ecrã vertical. HTTPS, instalação num dispositivo físico e sincronização remota exigem validação na futura infraestrutura privada.
