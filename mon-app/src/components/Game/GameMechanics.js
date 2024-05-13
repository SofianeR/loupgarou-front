export const roleAttributionFunction = (
  arrayPlayers,
  setArrayPlayers,
  customGame
) => {
  const copyArrayPlayers = [...arrayPlayers];
  let lengthPlayers = copyArrayPlayers.length;
  let wolfNumber = 0;
  let townFolkNumber = 0;
  if (!customGame) {
    if (lengthPlayers <= 6) {
      wolfNumber = 1;
    } else if (lengthPlayers > 6 && lengthPlayers <= 9) {
      wolfNumber = 2;
    } else {
      wolfNumber = 3;
    }
  } else {
    wolfNumber = customGame.wolfs;
    townFolkNumber = customGame.townFolks;
  }

  let i = 0;
  const playersWithRole = [];
  while (i < wolfNumber) {
    lengthPlayers = copyArrayPlayers.length;

    const randomRoleAttribution = Math.floor(
      Math.random() * (lengthPlayers - 0) + 0
    );

    playersWithRole.push({
      ...copyArrayPlayers[randomRoleAttribution],
      role: "loup",
      isDisqualified: false,
      countDisqualified: 0,
    });

    copyArrayPlayers.splice(randomRoleAttribution, 1);
    i++;
  }

  copyArrayPlayers.map((item) => {
    playersWithRole.push({
      ...item,
      role: "villageois",
      isDisqualified: false,
      countDisqualified: 0,
    });
  });

  setArrayPlayers(playersWithRole);
};

export const disqualificationHandle = (
  arrayPlayers,
  setArrayPlayers,
  selectedPlayer,
  setSelectedPlayer
) => {
  const copyArrayPlayers = [...arrayPlayers];
  const allSelectedPlayers = [];
  if (selectedPlayer) {
    allSelectedPlayers.push(selectedPlayer);

    if (allSelectedPlayers.length > 0) {
      allSelectedPlayers.map((item) => {
        if (item) {
          item.countDisqualified += 1;
        }
      });

      const disqualifiedPlayer = allSelectedPlayers
        .sort((a, b) => a.countDisqualified - b.countDisqualified)
        .pop();

      const findPlayerToDisqualify = copyArrayPlayers.find(
        (elmt) => elmt === disqualifiedPlayer
      );

      if (findPlayerToDisqualify) {
        findPlayerToDisqualify["isDisqualified"] = true;
      }

      setArrayPlayers(copyArrayPlayers);
    }
  }
  setSelectedPlayer();
};
