import java.util.*;

public class Main {
    static class Node{
        int count;
        String str;
        Node(String str){
            this.str = str;
            this.count = 1;
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        //小顶堆
        Map<String,Node> map = new HashMap<>();
        for(int i = 0; i < n;i++){
            String s = sc.next();
            Node node = map.get(s);
            if(node == null){
                map.put(s,new Node(s));
            }else{
                node.count++;
            }
        }
        Node[] nodes = new Node[map.values().size()];
        int index = 0;
        for(Node node : map.values()){
            nodes[index++] = node;
        }
        Arrays.sort(nodes,(Node n1,Node n2) -> (n1.count - n2.count == 0 ? n1.str.compareTo(n2.str) : n2.count - n1.count));

        for(int i = 0; i < k;i++){
            System.out.println(nodes[i].str + " " + nodes[i].count);
        }
        Stack<String> stack = new Stack<>();
        for(int i = nodes.length - 1; i > nodes.length  -1- k;i--){
            if(i - 1 > nodes.length  -1- k && nodes[i].count == nodes[i - 1].count){
                stack.push(nodes[i].str + " " + nodes[i].count);
            }else{
                System.out.println(nodes[i].str + " " + nodes[i].count);
            }
        }
        while(!stack.isEmpty()){
            System.out.println(stack.pop());
        }
    }
}