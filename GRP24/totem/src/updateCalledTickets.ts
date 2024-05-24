function updateCalledTickets() {
  const calledTicketsDiv = document.getElementById('calledTickets');
  calledTicketsDiv.innerHTML = '';
  const tickets = system.getLastCalled();
  for (let ticket of tickets) {
    const ticketDiv = document.createElement('div');
    ticketDiv.className = 'ticket';
    ticketDiv.textContent = `Senha: ${ticket.id}, Tipo: ${ticket.type}, Tempo médio: ${ticket.avgTime} minutos, Emitida em: ${ticket.issueTime.toLocaleTimeString()}`;
    calledTicketsDiv.appendChild(ticketDiv);
  }
}
