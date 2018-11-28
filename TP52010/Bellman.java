import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Stack;
import java.util.Vector;

public class Bellman {
	private Graph graph;
	private Node sourceNode;
	private List<Vector<Double>> piTable = new ArrayList<Vector<Double>>();
	private List<Vector<Integer>> rTable = new ArrayList<Vector<Integer>>();

	public Bellman(Graph g) {
		this.graph = g;
	}

	public void setSourceNode(Node source) {
		this.sourceNode = source;
	}

	public void shortestPath() {

		int iteration = 1;
		List<Edge> listeEdgesAVisiter = new ArrayList<Edge>();
		listeEdgesAVisiter = graph.getOutEdges(sourceNode);
		int v = graph.getNodes().size();
		piTable.clear();
		Vector<Double> vecTemp = new Vector<Double>();
		Vector<Integer> vecTempRTable = new Vector<Integer>();

		for (int i = 0; i < v; i++) {
			vecTempRTable.add(null);
		}

		for (int i = 0; i < v; i++) {
			vecTemp.add(graph.inf);
		}

		vecTemp.set(sourceNode.getId(), 0.0);

		piTable.add(vecTemp);
		rTable.add(vecTempRTable);

		while (iteration <= v) {

			vecTemp = (Vector) piTable.get(iteration - 1).clone();
			vecTempRTable = (Vector) rTable.get(iteration - 1).clone();
			List<Edge> prochaineListeAVisiter = new ArrayList<Edge>();

			for (Edge edge : listeEdgesAVisiter) {
				int srcID = edge.getSource().getId();
				int destID = edge.getDestination().getId();
				Double dist = edge.getDistance();

				if (vecTemp.get(srcID) + dist < vecTemp.get(destID)) {
					vecTemp.set(destID, vecTemp.get(srcID) + dist);
					vecTempRTable.set(destID, srcID);
					prochaineListeAVisiter.addAll(graph.getOutEdges(edge.getDestination()));
				}

			}

			listeEdgesAVisiter = prochaineListeAVisiter;
			piTable.add(vecTemp);
			rTable.add(vecTempRTable);
			if (piTable.get(iteration - 1).equals(piTable.get(iteration))) {
				break;
			}
			iteration++;

	
        }
	}

	public void diplayShortestPaths() {
		// Compl�ter
		Boolean estUnCercleNeg = false;
		Vector<Integer> vecLastRLine= new Vector<Integer>();
		Vector<Integer> cercleNeg= new Vector<Integer>();
		List<Vector<Integer>> shortestPathList = new ArrayList<Vector<Integer>>();
		vecLastRLine = rTable.get(rTable.size()-1);
		int idNode = 0;
		for (Integer node : vecLastRLine) {
			
			if(node != null) {
				
			if(estUnCercleNeg) {
				System.out.println("==> Le graphe contient un circuit de cout negatif ");
				System.out.println("");
				System.out.print("["+graph.getNodes().get(cercleNeg.get(0)).getName()+" - "+graph.getNodes().get(cercleNeg.get(0)).getName()+"] : ");
				System.out.print(graph.getNodes().get(cercleNeg.get(0)).getName());
				for (int i = 1; i < cercleNeg.size(); i++) {
					System.out.print("->"+graph.getNodes().get(cercleNeg.get(i)).getName());
				}
				
				break;
			}
			
			Integer nodeDepart = idNode;
			Vector<Integer> shortestPath = new Vector<Integer>();
			shortestPath.add(idNode);
			shortestPath.add(node);
			for (int i = 0; i < graph.getNodes().size(); i++) {
				
				if(node==null) {
					shortestPathList.add(shortestPath);
					break;				
				}
				
				shortestPath.add(vecLastRLine.get(node));
				
				if(nodeDepart==vecLastRLine.get(node)) {
					cercleNeg = shortestPath;
					estUnCercleNeg = true;
					break;
				}
				
				node=vecLastRLine.get(node);
				
			}
			}
			idNode++;
		}
		if(estUnCercleNeg == false) {
		System.out.println("=> Les chemins sont:");
		System.out.println("");
		for (int i = 0; i < shortestPathList.size(); i++) {
			for (int j = 0; j < shortestPathList.get(i).size(); j++) {
			
				if(shortestPathList.get(i).get(j)==null) {
					shortestPathList.get(i).set(j,0);
				}
				
			}		
		}

		for (int i = 0; i < shortestPathList.size(); i++) {
			System.out.print("["+graph.getNodes().get(shortestPathList.get(i).get(shortestPathList.get(i).size()-1)).getName()+" - "+graph.getNodes().get(shortestPathList.get(i).get(0)).getName()+"] ");
			String line;
			line = piTable.get(piTable.size()-1).get(i+1)+" : ";
			String path="";
			path+=graph.getNodes().get(shortestPathList.get(i).get(0)).getName();
			for (int j = 1; j < shortestPathList.get(i).size()-1; j++) {
				path+=" >- "+graph.getNodes().get(shortestPathList.get(i).get(j)).getName();
			}
			String reversePath = new StringBuffer(path).reverse().toString();
			line+=reversePath;
			System.out.print(line);
			System.out.println("");
		}
		}
	}

	public void displayTables() {
		// Compl�ter

		int iteration = 0;
		System.out.println("<< PITable >>:");
		System.out.print("		");
		for (int i = 0; i < graph.getNodes().size(); i++)
			System.out.print(graph.getNodes().get(i).getName() + "	");
		while (iteration < piTable.size()) {
			System.out.println();
			System.out.print(iteration + "	:	");
			for (int i = 0; i < graph.getNodes().size(); i++) {
				if (piTable.get(iteration).get(i) == Graph.inf)
					System.out.print("inf	");
				else
					System.out.print(piTable.get(iteration).get(i) + "	");
			}
			iteration++;
		}

		System.out.println("\n");
		iteration = 0;

		System.out.println("<< RTable >>:");
		System.out.print("k	: 	");
		for (int i = 0; i < graph.getNodes().size(); i++)
			System.out.print(graph.getNodes().get(i).getName() + "	");
		while (iteration < rTable.size()) {
			System.out.println();
			System.out.print(iteration + "	:");
			for (int i = 0; i < rTable.get(iteration).size(); i++) {
				if (rTable.get(iteration).get(i) != null)
					System.out.print("	" + graph.getNodes().get(rTable.get(iteration).get(i)).getName());
				else
					System.out.print("	-");
			}
			iteration++;
		}
		System.out.println("\n");
	}
}
