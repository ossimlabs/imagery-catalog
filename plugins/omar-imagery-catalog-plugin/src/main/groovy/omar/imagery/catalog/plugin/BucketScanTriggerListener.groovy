package omar.imagery.catalog.plugin

import org.quartz.JobExecutionContext
import org.quartz.Trigger
import org.quartz.TriggerListener

class BucketScanTriggerListener implements TriggerListener
{
	@Override
	String getName()
	{
		return 'BucketScanTriggerListener'
	}
	
	@Override
	void triggerFired( Trigger trigger, JobExecutionContext jobExecutionContext )
	{
		println "triggerFired: ${trigger} ${jobExecutionContext}"
	}
	
	@Override
	boolean vetoJobExecution( Trigger trigger, JobExecutionContext jobExecutionContext )
	{
		println "vetoJobExecution: ${trigger} ${jobExecutionContext}"
		
		return false
	}
	
	@Override
	void triggerMisfired( Trigger trigger )
	{
		println "triggerMisfired: ${trigger}"
	}
	
	@Override
	void triggerComplete( Trigger trigger, JobExecutionContext jobExecutionContext, Trigger.CompletedExecutionInstruction completedExecutionInstruction )
	{
		println "triggerComplete: ${trigger} ${jobExecutionContext} ${completedExecutionInstruction}"
	}
}
