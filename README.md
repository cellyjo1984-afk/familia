# Família Lemos — Organização Familiar

Primeira versão funcional em português de Portugal, com **dados fictícios**. JavaScript, HTML e CSS, sem dependências externas, servidos por Node.js 20 ou superior. Esta escolha permite testar a interface sem contas, instalação de bibliotecas ou serviços pagos.

## Como testar, passo a passo

1. Instale a versão LTS do Node.js a partir de https://nodejs.org se estiver a usar o seu computador.
2. Transfira este projeto e abra a pasta `familia` no terminal (pode usar o terminal do Visual Studio Code).
3. Escreva `npm start` e prima Enter. Não é necessário executar `npm install`.
4. No navegador **do mesmo computador**, abra `http://127.0.0.1:3000`.
5. Explore o menu. Crie um compromisso, altere-o ao tocar nele, atribua uma tarefa e marque-a como concluída. Atualize a página para confirmar que os dados continuam lá.
6. Em **A nossa casa**, adicione compras e recados e preencha as refeições da semana atual. O botão **Modo televisão** aumenta a apresentação; use o botão de saída para voltar.
7. Para parar, volte ao terminal e prima **Ctrl+C**.

Num ambiente na nuvem, o endereço acima pertence à máquina na nuvem, não ao seu computador. Esta configuração não publica uma aplicação nem fornece um endereço público. Para experimentar sem experiência em redes, descarregue o projeto e siga os passos no seu computador. Não abra portas públicas nesta versão.

## O que já funciona

- Painel com data, agenda de hoje, próximos sete dias, tarefas e progresso por pessoa.
- Calendário diário, semanal e mensal, com semana à segunda-feira; cores por pessoa e eventos de toda a família.
- Criar, editar e eliminar compromissos únicos, semanais e mensais. A edição e a eliminação afetam a série inteira. Datas mensais 29–31 são omitidas nos meses que não têm esse dia.
- Tarefas diárias, semanais e ocasionais com responsável, edição, eliminação e histórico. As semanais renovam à segunda-feira; as ocasionais permanecem concluídas. Eliminar uma tarefa elimina o seu histórico.
- Compras com marcação e eliminação, notas e planeamento de almoço/jantar da semana atual.
- Layout adaptável, botões táteis, modo TV e manifesto para atalho no ecrã inicial. No menu do navegador procure “Adicionar ao ecrã principal”. A disponibilidade depende do navegador; não há suporte offline e o servidor tem de estar ligado. Uma TV tem de ter navegador compatível.

## Limites e privacidade desta demonstração

Não existe autenticação, base de dados, sincronização entre dispositivos, encriptação da aplicação ou recuperação de dados. **Use apenas dados fictícios.** O servidor escuta apenas na interface local `127.0.0.1`. Não o exponha à Internet. Os nomes configurados identificam as pessoas da interface; os compromissos e restantes conteúdos iniciais são exemplos.

Os dados ficam no `localStorage` deste navegador e desta origem. Separadores do mesmo navegador atualizam-se entre si; dispositivos, perfis e navegadores diferentes não partilham dados. A navegação privada, a limpeza de dados ou a mudança de endereço podem perder ou esconder os registos. Para reiniciar os exemplos, elimine os dados deste site nas definições do navegador (ação irreversível).

## Verificações para desenvolvimento

- `npm test`: testes das regras de recorrência, renovação de tarefas e serialização dos dados.
- `node --check public/app.js`: verificação de sintaxe.
- `npm start`: servidor de desenvolvimento sem dependências; `PORT` permite escolher outra porta local.

A interface foi exercitada automaticamente em Chromium, incluindo CRUD de eventos, persistência após recarregar, tarefas, compras, notas, refeições, vistas do calendário, largura de telemóvel e modo TV. Os testes do navegador são verificações desta sessão; não requerem bibliotecas no projeto.

## Segunda fase

Veja [FASE-2.md](FASE-2.md). Esta fase está planeada e ainda não foi implementada. Não publique dados familiares reais antes de implementar e testar os controlos de acesso.

## Tipografia

A fonte arredondada Nunito está incluída localmente em `public/fonts`, sob a licença SIL Open Font License (ver `public/fonts/OFL.txt`). Não faz pedidos a serviços de fontes externos.
