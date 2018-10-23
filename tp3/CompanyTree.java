public class CompanyTree {

	private CompanyNode root;

	public CompanyTree() {
	}

	// TODO: initialisation
	public CompanyTree(CompanyNode item) {
		root = item;
	}

	// TODO: une compagnie mère achete une autre compagnie
	// O(n)
	public void buy(CompanyNode item) {
		root.buy(item);
		if (root.worstChild.compareTo(item) > 0)
			root.worstChild = item.worstChild;
	}

	// TODO: on retourne le montant en banque de la compagnie mère
	// O(1)
	public Integer getMoney() {
		return root.getMoney();
	}

	// TODO: si on avait a laisser tomber un enfant, ça serait lui
	// Ceci est le pire de tous les enfants et les sous-enfants
	// O(1)
	public Integer getWorstChildMoney() {
		return root.worstChild.getMoney();
	}

	// TODO: on retourne en string un presentation en ordre inverse
	// de la compagnie mère et de ses enfants
	// O(1)
	public String getTreeInOrder() {
		StringBuilder builder = new StringBuilder();
		root.fillStringBuilderInOrder(builder, "> ");
		return builder.toString();
	}
}
