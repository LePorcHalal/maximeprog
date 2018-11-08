import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Scanner;


public class Graph {

	private List<Node> nodes = new ArrayList<Node>(); // Noeuds
	private List<Edge> edges = new ArrayList<Edge>();; // Les arcs
	static final double inf = 99999;
	public Graph() {
		
	}

	public void readFromFile(String filePath,String separtor){
		//compl�ter
		try {
			FileReader fr = new FileReader(filePath);
			BufferedReader br = new BufferedReader(fr);
			
			String currentLine = br.readLine();
			String[] parts = currentLine.split(separtor);
			for(int i = 0; i<parts.length; i++)
				nodes.add(new Node(nodes.size(), parts[i]));

			int nodeSource = 0;
			while ((currentLine = br.readLine()) != null) {
				parts = currentLine.split(separtor);
				int nodeDestination = 0;
				for(int i = 0; i<parts.length; i++){
					if(parts[i].equals("inf") == false)
						if(Double.parseDouble(parts[i]) != 0.0)
							edges.add(new Edge(nodes.get(nodeSource), nodes.get(nodeDestination), Double.parseDouble(parts[i])));
					nodeDestination++;
				}
			}
			br.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public List<Edge> getOutEdges(Node source) {
		List<Edge> outEdges= new ArrayList<Edge>(); 
		for(int i =0; i<edges.size(); i++){
			if(edges.get(i).getSource().equals(source)==true){
				outEdges.add(edges.get(i));
			}
		}
		// compl�ter
		return outEdges;	
	}
	
	public List<Edge> getInEdges(Node dest) {
		List<Edge> inEdges= new ArrayList<Edge>(); 
		for(int i =0; i<edges.size(); i++){
			if(edges.get(i).getDestination().equals(source)==true){
				inEdges.add(edges.get(i));
			}
		}
		// compl�ter
		return inEdges;		
	}
	// Accesseurs 
	public List<Node> getNodes() {
		return nodes;
	}
	public void setNodes(List<Node> nodes) {
		this.nodes = nodes;
	}
	public List<Edge> getEdges() {
		return edges;
	}
	public void setEdges(List<Edge> edges) {
		this.edges = edges;
	}
	public Node getNodeByName(String name){
		for (Node node : nodes) {
			if(node.getName().equals(name)){
				return node;
			}
		}
		return null;
	}
	
	public Node getNodeById(int id){
		for (Node node : nodes) {
			if(node.getId()==id){
				return node;
			}

		}
		return null;
	}
}
