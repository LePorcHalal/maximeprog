// Toute modification a ce fichier ne sera pas comptabilisée
public class Main {

    // Le main fait simplement tester votre logique pour les deux exercices
    public static void main(String[] args) {
        System.out.println("Debut des tests du TP3");
        TestBinary testBinary = new TestBinary();
        testBinary.test();
/*
        CompanyTree compTree = new CompanyTree(new CompanyNode(400));
        CompanyNode node11 = new CompanyNode(50);
        CompanyNode node12 = new CompanyNode(5);
        CompanyNode node21 = new CompanyNode(30);
        CompanyNode node22 = new CompanyNode(10);
        CompanyNode node31 = new CompanyNode(90);
        CompanyNode node32 = new CompanyNode(-60);
        CompanyNode node33 = new CompanyNode(-30);
        CompanyNode node34 = new CompanyNode(-15);

        compTree.buy(node11);
        compTree.buy(node12);
        node11.buy(node21);
        node11.buy(node22);
        node21.buy(node31);
        node21.buy(node32);
        node22.buy(node33);
        node22.buy(node34);

        System.out.println("\n" + compTree.getWorstChildMoney() +"\n");
        System.out.println(compTree.getMoney() +"\n");
        System.out.println(compTree.getTreeInOrder() +"\n");
  */      
        TestCompany testCompany = new TestCompany();
        testCompany.test();
    }
}
