document.getElementById('btnSE').addEventListener('click', () => {
  const ticket = system.issueTicket("SE", 1);
  updateCalledTickets();
});
