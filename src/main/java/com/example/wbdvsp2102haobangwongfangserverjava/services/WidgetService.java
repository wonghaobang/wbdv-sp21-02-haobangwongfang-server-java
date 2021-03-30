package com.example.wbdvsp2102haobangwongfangserverjava.services;
import com.example.wbdvsp2102haobangwongfangserverjava.models.Widget;
import com.example.wbdvsp2102haobangwongfangserverjava.repositories.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class WidgetService {

    @Autowired
    WidgetRepository repository;


    public Widget createWidgetForTopic(String topicId, Widget widget) {
        widget.setTopicId(topicId);
        return repository.save(widget);
    }


    public List<Widget> findAllWidgets() {
        return (List<Widget>) repository.findAll();
    }


    public Widget findWidgetById(Long id) {
        return repository.findById(id).get();
    }


    public List<Widget> findWidgetsForTopic(String topicId) {
        return repository.findWidgetsForTopic(topicId);
    }


    public Integer deleteWidget(Long id) {
        repository.deleteById(id);
        return 1;
    }


    public Integer updateWidget(Long id, Widget widget) {
        Widget originalWidget = repository.findById(id).get();

        // TODO: copy all the other fields testing for null
        originalWidget.setText(widget.getText());

        originalWidget.setType(widget.getType());
        originalWidget.setSize(widget.getSize());
        originalWidget.setSrc(widget.getSrc());
        originalWidget.setWidth(widget.getWidth());
        originalWidget.setHeight(widget.getHeight());
        originalWidget.setOrdered(widget.getOrdered());

        repository.save(originalWidget);

        return 1;

    }


}
