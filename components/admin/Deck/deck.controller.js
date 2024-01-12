const service = require("./deck.service");
exports.DeckPage = async (req, res, next) => {
    const styles = [
        "/admin/vendor/datatables/dataTables.bootstrap4.min.css",
        "/adminExtra/styles/card-list.css",
      ];
      const scripts = [
        "/admin/js/datatables/table-card.js",
        "/admin/vendor/datatables/jquery.dataTables.min.js",
        "/admin/vendor/datatables/dataTables.bootstrap4.min.js",
        "/adminExtra/scripts/set-list.js",
      ];
      const decks = await service.GetAllDecks();
    //   console.log(decks);
      res.render("admin/set", {
        layout: "admin/layouts/layout",
        title: "Decks",
        scripts: scripts,
        styles: styles,
        decks: decks,
        currentUser: req.user,
      });
}
exports.DisableDeck = async (req, res, next) => {
    try {
        const deckId = req.params.deckId;
        const updatedDeck = await service.DisableDeck(deckId);
        res.status(200).json(updatedDeck);
      } catch (error) {
        console.error("Error disabling set:", error);
        res.status(500).send("Internal Server Error");
      }
}
exports.EnableDeck = async (req, res, next) => {
    const deckId = req.params.deckId;
  
    try {
      const updatedDeck = await service.EnableDeck(deckId);
      res.status(200).json(updatedDeck);
    } catch (error) {
      console.error("Error enabling set:", error);
      res.status(500).send("Internal Server Error");
    }
  };
  exports.DeleteDeck = async function (req, res, next) {
    const deckId = req.params.deckId;
  
    try {
      const deletedDeck = await service.DeleteDeck(deckId);
  
      if (!deletedDeck) {
        return res.status(404).json({ message: "Set not found" });
      }
  
      res.status(200).json({ message: "Set deleted successfully", deletedDeck });
    } catch (error) {
      console.error("Error in set deletion API:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };